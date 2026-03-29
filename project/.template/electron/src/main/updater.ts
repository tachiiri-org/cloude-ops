import { BrowserWindow, app, ipcMain } from 'electron';
import { autoUpdater } from 'electron-updater';

import { getAppMetadata } from '@shared/app-metadata';
import { GET_RUNTIME_SNAPSHOT_CHANNEL, RUNTIME_SNAPSHOT_EVENT } from '@shared/runtime-ipc';
import type { RuntimeSnapshot, UpdateStatus } from '@shared/runtime-snapshot';

const getReleaseFeedUrl = (appMetadata: RuntimeSnapshot['app']): string =>
  `https://github.com/${appMetadata.repositoryOwner}/${appMetadata.repositoryName}/releases/download/update-${appMetadata.channel}`;

const createInitialSnapshot = (): RuntimeSnapshot => {
  const metadata = getAppMetadata();
  const feedUrl = metadata.updateOverrideUrl ?? (app.isPackaged ? getReleaseFeedUrl(metadata) : null);
  const canCheckForUpdates = app.isPackaged || Boolean(feedUrl);

  return {
    app: metadata,
    update: {
      autoDownload: app.isPackaged,
      feedUrl,
      lastCheckedAt: null,
      latestPublishedAt: null,
      latestVersion: null,
      message: canCheckForUpdates
        ? 'Waiting for automatic update check.'
        : 'Update checks stay disabled for unpackaged local runs.',
      status: canCheckForUpdates ? 'checking' : 'disabled',
    },
  };
};

let runtimeSnapshot = createInitialSnapshot();

const publishSnapshot = (): void => {
  for (const window of BrowserWindow.getAllWindows()) {
    window.webContents.send(RUNTIME_SNAPSHOT_EVENT, runtimeSnapshot);
  }
};

const setSnapshot = (
  status: UpdateStatus,
  message: string,
  partialUpdate: Partial<RuntimeSnapshot['update']> = {},
): void => {
  runtimeSnapshot = {
    app: runtimeSnapshot.app,
    update: {
      ...runtimeSnapshot.update,
      ...partialUpdate,
      message,
      status,
    },
  };

  publishSnapshot();
};

const getNowIsoString = (): string => new Date().toISOString();

const configureAutoUpdater = (): boolean => {
  const feedUrl =
    runtimeSnapshot.update.feedUrl ?? (app.isPackaged ? getReleaseFeedUrl(runtimeSnapshot.app) : null);

  if (!feedUrl) {
    return false;
  }

  autoUpdater.autoDownload = app.isPackaged;
  autoUpdater.autoInstallOnAppQuit = app.isPackaged;
  autoUpdater.allowPrerelease = runtimeSnapshot.app.channel === 'dev';
  autoUpdater.forceDevUpdateConfig = !app.isPackaged;
  autoUpdater.channel = runtimeSnapshot.app.channel;
  autoUpdater.setFeedURL({
    provider: 'generic',
    url: feedUrl,
  });

  autoUpdater.on('checking-for-update', () => {
    setSnapshot('checking', 'Checking for updates.', {
      lastCheckedAt: getNowIsoString(),
    });
  });

  autoUpdater.on('update-not-available', (info) => {
    setSnapshot('up-to-date', 'No newer update is available for this channel.', {
      lastCheckedAt: getNowIsoString(),
      latestPublishedAt: info.releaseDate ?? null,
      latestVersion: info.version,
    });
  });

  autoUpdater.on('update-available', (info) => {
    const message = app.isPackaged
      ? 'Update found. Downloading the release artifact.'
      : 'Update found. Download stays disabled for unpackaged verification builds.';

    setSnapshot('update-available', message, {
      lastCheckedAt: getNowIsoString(),
      latestPublishedAt: info.releaseDate ?? null,
      latestVersion: info.version,
    });
  });

  autoUpdater.on('update-downloaded', (info) => {
    setSnapshot('downloaded', 'Update downloaded. It will install on the next restart.', {
      lastCheckedAt: getNowIsoString(),
      latestPublishedAt: info.releaseDate ?? null,
      latestVersion: info.version,
    });
  });

  autoUpdater.on('error', (error) => {
    setSnapshot('error', error.message, {
      lastCheckedAt: getNowIsoString(),
    });
  });

  return true;
};

export const registerRuntimeSnapshotHandlers = (): void => {
  ipcMain.handle(GET_RUNTIME_SNAPSHOT_CHANNEL, () => runtimeSnapshot);
};

export const checkForUpdates = async (): Promise<void> => {
  if (!configureAutoUpdater()) {
    setSnapshot('disabled', 'Update checks stay disabled for unpackaged local runs.');
    return;
  }

  try {
    await autoUpdater.checkForUpdates();
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown update error.';

    setSnapshot('error', message, {
      lastCheckedAt: getNowIsoString(),
    });
  }
};
