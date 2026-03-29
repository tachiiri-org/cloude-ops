import type { RuntimeSnapshot } from '@shared/runtime-snapshot';

import type { RuntimeDiagnosticsSnapshot } from '../../contract/runtime-diagnostics';
import type { RuntimeDiagnosticsSource } from '../../contract/runtime-diagnostics-source';

import type { DesktopApi } from './desktop-api';

const resolveDesktopApi = (): DesktopApi => {
  if (!window.desktop) {
    throw new Error('Desktop bridge is unavailable.');
  }

  return window.desktop;
};

const mapRuntimeSnapshot = (snapshot: RuntimeSnapshot): RuntimeDiagnosticsSnapshot => ({
  app: {
    buildTime: snapshot.app.buildTime,
    channel: snapshot.app.channel,
    environment: snapshot.app.environment,
    name: snapshot.app.name,
    runtime: snapshot.app.runtime,
    version: snapshot.app.version,
  },
  update: {
    lastCheckedAt: snapshot.update.lastCheckedAt,
    latestPublishedAt: snapshot.update.latestPublishedAt,
    latestVersion: snapshot.update.latestVersion,
    message: snapshot.update.message,
    status: snapshot.update.status,
  },
});

export const electronRuntimeDiagnosticsSource: RuntimeDiagnosticsSource = {
  getInitialSnapshot: async () =>
    mapRuntimeSnapshot(await resolveDesktopApi().getRuntimeSnapshot()),
  subscribe: (listener) =>
    resolveDesktopApi().onRuntimeSnapshot((snapshot) => {
      listener(mapRuntimeSnapshot(snapshot));
    }),
};
