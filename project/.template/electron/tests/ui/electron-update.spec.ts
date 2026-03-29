import { createHash } from 'node:crypto';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { readFileSync } from 'node:fs';
import { createServer } from 'node:http';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { _electron as electron, expect, test } from '@playwright/test';

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const artifactDir = resolve(tmpdir(), '__APP_NAME__-update-feed');
const updatePort = 43123;
const currentVersion = JSON.parse(
  readFileSync(resolve(projectRoot, 'package.json'), 'utf8'),
).version;
const extraLaunchArgs = (process.env.PLAYWRIGHT_ELECTRON_EXTRA_ARGS ?? '')
  .split(' ')
  .map((value) => value.trim())
  .filter((value) => value.length > 0);

const getNextPatchVersion = (version: string): string => {
  const [major, minor, patch] = version.split('.').map(Number);

  return `${major}.${minor}.${patch + 1}`;
};

const nextVersion = getNextPatchVersion(currentVersion);

const createUpdateFeed = async (channel: 'dev' | 'stable'): Promise<void> => {
  await mkdir(artifactDir, { recursive: true });

  const artifactName = `__APP_NAME__-${nextVersion}-${channel}.AppImage`;
  const artifactPath = join(artifactDir, artifactName);
  const artifactContents = Buffer.from('__APP_NAME__-update-artifact', 'utf8');
  const sha512 = createHash('sha512').update(artifactContents).digest('base64');

  await writeFile(artifactPath, artifactContents);
  await writeFile(
    join(artifactDir, `${channel}-linux.yml`),
    [
      `version: ${nextVersion}`,
      'files:',
      `  - url: ${artifactName}`,
      `    sha512: ${sha512}`,
      `    size: ${artifactContents.byteLength}`,
      `path: ${artifactName}`,
      `sha512: ${sha512}`,
      "releaseDate: '2026-03-15T00:00:00.000Z'",
      '',
    ].join('\n'),
    'utf8',
  );
};

for (const scenario of [
  { channel: 'dev', environment: 'development' },
  { channel: 'stable', environment: 'production' },
] as const) {
  test(`checks the configured ${scenario.channel} update feed and surfaces update diagnostics`, async () => {
    await createUpdateFeed(scenario.channel);

    const server = createServer(async (request, response) => {
      const requestUrl = new URL(
        request.url ?? `/${scenario.channel}-linux.yml`,
        `http://127.0.0.1:${updatePort}`,
      );
      const requestPath =
        requestUrl.pathname === '/' ? `/${scenario.channel}-linux.yml` : requestUrl.pathname;
      const filePath = join(artifactDir, requestPath.replace(/^\//, ''));

      try {
        const contents = await readFile(filePath);

        response.writeHead(200, {
          'Content-Type': requestPath.endsWith('.yml') ? 'text/yaml' : 'application/octet-stream',
        });
        response.end(contents);
      } catch {
        response.writeHead(404);
        response.end();
      }
    });

    await new Promise<void>((resolvePromise) => {
      server.listen(updatePort, '127.0.0.1', () => {
        resolvePromise();
      });
    });

    const electronApp = await electron.launch({
      args: ['--no-sandbox', ...extraLaunchArgs, 'out/main/index.js'],
      cwd: projectRoot,
      env: {
        ...process.env,
        APP_CHANNEL: scenario.channel,
        APP_UPDATE_URL: `http://127.0.0.1:${updatePort}`,
        ELECTRON_DISABLE_SANDBOX: '1',
        ELECTRON_FORCE_DEV_UPDATE_CONFIG: '1',
        LIBGL_ALWAYS_SOFTWARE: process.env.LIBGL_ALWAYS_SOFTWARE ?? '1',
      },
    });

    try {
      const firstWindow = await electronApp.firstWindow();

      await expect(firstWindow.locator('#app-channel')).toHaveText(scenario.channel);
      await expect(firstWindow.locator('#app-environment')).toHaveText(scenario.environment);
      await expect(firstWindow.locator('#update-status')).toHaveText('update-available');
      await expect(firstWindow.locator('#update-latest-version')).toHaveText(nextVersion);
      await expect(firstWindow.locator('#update-latest-published')).toContainText(
        '2026-03-15T00:00:00Z',
      );
      await expect(firstWindow.locator('#update-last-checked')).not.toHaveText('Pending');
    } finally {
      server.closeAllConnections();
      server.close();
      await electronApp.close();
    }
  });
}
