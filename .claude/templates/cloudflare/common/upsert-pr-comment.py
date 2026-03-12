#!/usr/bin/env python3

from __future__ import annotations

import json
import os
import sys
import urllib.error
import urllib.request
from pathlib import Path


def request(method: str, url: str, token: str, payload: dict[str, object] | None = None) -> object:
    headers = {
        "Accept": "application/vnd.github+json",
        "Authorization": f"Bearer {token}",
        "X-GitHub-Api-Version": "2022-11-28",
        "User-Agent": "cloudflare-comment-updater",
    }
    data = None
    if payload is not None:
        headers["Content-Type"] = "application/json"
        data = json.dumps(payload).encode("utf-8")

    req = urllib.request.Request(url, data=data, headers=headers, method=method)
    with urllib.request.urlopen(req) as response:
        body = response.read()
        if not body:
            return None
        return json.loads(body.decode("utf-8"))


def main() -> int:
    if len(sys.argv) != 2:
        print("usage: upsert-pr-comment.py BODY_FILE", file=sys.stderr)
        return 1

    token = os.environ["GITHUB_TOKEN"]
    repository = os.environ["GITHUB_REPOSITORY"]
    pr_number = os.environ["PR_NUMBER"]
    marker = os.environ["COMMENT_MARKER"]
    body = Path(sys.argv[1]).read_text()

    comments_url = f"https://api.github.com/repos/{repository}/issues/{pr_number}/comments"
    try:
        comments = request("GET", comments_url, token)
    except urllib.error.HTTPError as exc:
        print(exc.read().decode("utf-8"), file=sys.stderr)
        raise

    existing_id: int | None = None
    assert isinstance(comments, list)
    for comment in comments:
        if marker in comment.get("body", ""):
            existing_id = int(comment["id"])
            break

    if existing_id is None:
        request("POST", comments_url, token, {"body": body})
    else:
        request(
            "PATCH",
            f"https://api.github.com/repos/{repository}/issues/comments/{existing_id}",
            token,
            {"body": body},
        )

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
