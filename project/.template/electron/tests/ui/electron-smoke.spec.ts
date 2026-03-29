import { fileURLToPath } from 'node:url';
import { mkdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { readFileSync } from 'node:fs';

import { _electron as electron, expect, test } from '@playwright/test';

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const screenshotPath = resolve(projectRoot, 'artifacts/ui-smoke/main-window.png');
const expectedChannel = process.env.APP_CHANNEL === 'stable' ? 'stable' : 'dev';
const expectedEnvironment = expectedChannel === 'stable' ? 'production' : 'development';
const expectedVersion = JSON.parse(
  readFileSync(resolve(projectRoot, 'package.json'), 'utf8'),
).version;
const extraLaunchArgs = (process.env.PLAYWRIGHT_ELECTRON_EXTRA_ARGS ?? '')
  .split(' ')
  .map((value) => value.trim())
  .filter((value) => value.length > 0);

test('launches the built Electron app and renders the baseline UI', async () => {
  await mkdir(dirname(screenshotPath), { recursive: true });

  const electronApp = await electron.launch({
    args: ['--no-sandbox', ...extraLaunchArgs, 'out/main/index.js'],
    cwd: projectRoot,
    env: {
      ...process.env,
      ELECTRON_DISABLE_SANDBOX: '1',
      LIBGL_ALWAYS_SOFTWARE: process.env.LIBGL_ALWAYS_SOFTWARE ?? '1',
    },
  });

  const firstWindow = await electronApp.firstWindow();
  const pageErrors: string[] = [];
  const consoleErrors: string[] = [];

  firstWindow.on('pageerror', (error: Error) => {
    pageErrors.push(error.message);
  });

  firstWindow.on('console', (message) => {
    if (message.type() === 'error') {
      consoleErrors.push(message.text());
    }
  });

  await expect(firstWindow.locator('h1')).toHaveText('__APP_NAME__');
  await expect(firstWindow.locator('#bootstrap-error')).toBeHidden();
  await expect(firstWindow.locator('#app-name')).toHaveText('__APP_NAME__');
  await expect(firstWindow.locator('#app-channel')).toHaveText(expectedChannel);
  await expect(firstWindow.locator('#app-environment')).toHaveText(expectedEnvironment);
  await expect(firstWindow.locator('#app-version')).toHaveText(expectedVersion);
  await expect(firstWindow.locator('#app-runtime')).toHaveText('electron');
  await expect(firstWindow.locator('#update-status')).toHaveText('disabled');
  await firstWindow.waitForLoadState('domcontentloaded');
  await firstWindow.screenshot({ path: screenshotPath, fullPage: true });

  expect(pageErrors).toEqual([]);
  expect(consoleErrors).toEqual([]);

  await electronApp.close();
});
