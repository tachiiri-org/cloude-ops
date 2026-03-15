import type { AppMetadata } from './app-metadata';

export type UpdateStatus =
  | 'disabled'
  | 'checking'
  | 'up-to-date'
  | 'update-available'
  | 'downloaded'
  | 'error';

export type RuntimeSnapshot = {
  readonly app: AppMetadata;
  readonly update: {
    readonly autoDownload: boolean;
    readonly feedUrl: string | null;
    readonly lastCheckedAt: string | null;
    readonly latestPublishedAt: string | null;
    readonly latestVersion: string | null;
    readonly message: string;
    readonly status: UpdateStatus;
  };
};
