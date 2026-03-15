import { contextBridge, ipcRenderer } from 'electron';

import { getAppMetadata, type AppMetadata } from '@shared/app-metadata';
import { GET_RUNTIME_SNAPSHOT_CHANNEL, RUNTIME_SNAPSHOT_EVENT } from '@shared/runtime-ipc';
import type { RuntimeSnapshot } from '@shared/runtime-snapshot';

type DesktopApi = {
  readonly getAppMetadata: () => AppMetadata;
  readonly getRuntimeSnapshot: () => Promise<RuntimeSnapshot>;
  readonly onRuntimeSnapshot: (listener: (snapshot: RuntimeSnapshot) => void) => () => void;
};

const desktopApi: DesktopApi = {
  getAppMetadata,
  getRuntimeSnapshot: async () =>
    (await ipcRenderer.invoke(GET_RUNTIME_SNAPSHOT_CHANNEL)) as RuntimeSnapshot,
  onRuntimeSnapshot: (listener) => {
    const wrappedListener = (_event: unknown, snapshot: RuntimeSnapshot): void => {
      listener(snapshot);
    };

    ipcRenderer.on(RUNTIME_SNAPSHOT_EVENT, wrappedListener);

    return () => {
      ipcRenderer.off(RUNTIME_SNAPSHOT_EVENT, wrappedListener);
    };
  },
};

contextBridge.exposeInMainWorld('desktop', desktopApi);
