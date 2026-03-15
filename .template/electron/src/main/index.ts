import { app, BrowserWindow } from 'electron';
import { join } from 'node:path';

import { getAppVersion } from '@shared/app-metadata';

import { checkForUpdates, registerRuntimeSnapshotHandlers } from './updater';

const createMainWindow = (): BrowserWindow => {
  const window = new BrowserWindow({
    width: 1200,
    height: 760,
    minWidth: 960,
    minHeight: 640,
    show: false,
    webPreferences: {
      preload: join(__dirname, '../preload/index.mjs'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false,
    },
  });

  window.on('ready-to-show', () => {
    window.maximize();
    window.show();
  });

  if (process.env.ELECTRON_RENDERER_URL) {
    void window.loadURL(process.env.ELECTRON_RENDERER_URL);
  } else {
    void window.loadFile(join(__dirname, '../renderer/index.html'));
  }

  return window;
};

registerRuntimeSnapshotHandlers();

const patchAppVersion = (): void => {
  const version = getAppVersion();

  Object.defineProperty(app, 'getVersion', {
    configurable: true,
    value: () => version,
  });
};

app.whenReady().then(() => {
  patchAppVersion();
  createMainWindow();
  void checkForUpdates();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createMainWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
