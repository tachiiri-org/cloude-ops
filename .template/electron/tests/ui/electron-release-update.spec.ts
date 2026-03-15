import { expect, test } from '@playwright/test';
import { _electron as electron } from '@playwright/test';

const packagedAppPath = process.env.PACKAGED_APP_PATH;
const packagedExecutablePath = process.env.PACKAGED_EXECUTABLE_PATH ?? packagedAppPath;
const expectedChannel = process.env.EXPECTED_CHANNEL;
const expectedEnvironment = process.env.EXPECTED_ENVIRONMENT;
const expectedLatestVersion = process.env.EXPECTED_LATEST_VERSION;

if (
  !packagedAppPath ||
  !packagedExecutablePath ||
  !expectedChannel ||
  !expectedEnvironment ||
  !expectedLatestVersion
) {
  throw new Error(
    'PACKAGED_APP_PATH, PACKAGED_EXECUTABLE_PATH, EXPECTED_CHANNEL, EXPECTED_ENVIRONMENT, and EXPECTED_LATEST_VERSION are required.',
  );
}

test('detects a newer published update from the packaged app', async () => {
  const electronApp = await electron.launch({
    executablePath: packagedExecutablePath,
    args: [],
    cwd: process.cwd(),
    env: {
      ...process.env,
      APPIMAGE: packagedAppPath,
      ELECTRON_DISABLE_SANDBOX: '1',
      ...(packagedExecutablePath === packagedAppPath ? { APPIMAGE_EXTRACT_AND_RUN: '1' } : {}),
    },
  });

  try {
    const firstWindow = await electronApp.firstWindow();

    await expect(firstWindow.locator('#app-channel')).toHaveText(expectedChannel);
    await expect(firstWindow.locator('#app-environment')).toHaveText(expectedEnvironment);
    await expect(firstWindow.locator('#update-status')).toHaveText('update-available');
    await expect(firstWindow.locator('#update-latest-version')).toHaveText(expectedLatestVersion);
    await expect(firstWindow.locator('#update-last-checked')).not.toHaveText('Pending');
  } finally {
    await electronApp.close();
  }
});
