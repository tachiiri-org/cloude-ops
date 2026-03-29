import type { RuntimeDiagnosticsSnapshot } from '../contract/runtime-diagnostics';

import { formatTimestampDisplay } from './timestamp-display';

type MetadataEntry = {
  readonly id: string;
  readonly label: string;
  readonly value: string;
};

export type RuntimeViewModel = {
  readonly bootstrapError: string | null;
  readonly eyebrow: string;
  readonly metadata: readonly MetadataEntry[];
  readonly runtimeSummary: string;
  readonly summary: string;
  readonly title: string;
  readonly updateMessage: string;
};

const defaultSummary =
  'Renderer code stays untrusted. OS access and credential-bearing flows remain in main or tightly scoped preload APIs.';

const createFallbackViewModel = (bootstrapError: string): RuntimeViewModel => ({
  bootstrapError,
  eyebrow: 'Electron Baseline',
  metadata: [
    { id: 'app-name', label: 'Name', value: '__APP_NAME__' },
    { id: 'app-channel', label: 'Channel', value: 'Pending' },
    { id: 'app-environment', label: 'Environment', value: 'Pending' },
    { id: 'app-version', label: 'Version', value: 'Pending' },
    { id: 'app-runtime', label: 'Runtime', value: 'electron' },
    { id: 'app-build-time', label: 'Built At', value: 'Pending' },
    { id: 'update-status', label: 'Update Status', value: 'error' },
    { id: 'update-latest-version', label: 'Latest Version', value: 'Pending' },
    { id: 'update-latest-published', label: 'Latest Published', value: 'Pending' },
    { id: 'update-last-checked', label: 'Last Checked', value: 'Pending' },
  ],
  runtimeSummary:
    'name=__APP_NAME__\nchannel=Pending\nenvironment=Pending\nversion=Pending\nruntime=electron\nbuild=Pending\nupdate_status=error\nupdate_latest=Pending\nupdate_published=Pending\nupdate_checked=Pending',
  summary: defaultSummary,
  title: '__APP_NAME__',
  updateMessage: 'Runtime diagnostics are unavailable.',
});

export const createRuntimeViewModel = (
  snapshot: RuntimeDiagnosticsSnapshot | null,
  bootstrapError: string | null = null,
): RuntimeViewModel => {
  if (!snapshot) {
    return createFallbackViewModel(bootstrapError ?? 'Runtime snapshot is unavailable.');
  }

  return {
    bootstrapError,
    eyebrow: 'Electron Baseline',
    metadata: [
      { id: 'app-name', label: 'Name', value: snapshot.app.name },
      { id: 'app-channel', label: 'Channel', value: snapshot.app.channel },
      { id: 'app-environment', label: 'Environment', value: snapshot.app.environment },
      { id: 'app-version', label: 'Version', value: snapshot.app.version },
      { id: 'app-runtime', label: 'Runtime', value: snapshot.app.runtime },
      {
        id: 'app-build-time',
        label: 'Built At',
        value: formatTimestampDisplay(snapshot.app.buildTime),
      },
      { id: 'update-status', label: 'Update Status', value: snapshot.update.status },
      {
        id: 'update-latest-version',
        label: 'Latest Version',
        value: snapshot.update.latestVersion ?? snapshot.app.version,
      },
      {
        id: 'update-latest-published',
        label: 'Latest Published',
        value: formatTimestampDisplay(snapshot.update.latestPublishedAt),
      },
      {
        id: 'update-last-checked',
        label: 'Last Checked',
        value: formatTimestampDisplay(snapshot.update.lastCheckedAt),
      },
    ],
    runtimeSummary: [
      `name=${snapshot.app.name}`,
      `channel=${snapshot.app.channel}`,
      `environment=${snapshot.app.environment}`,
      `version=${snapshot.app.version}`,
      `runtime=${snapshot.app.runtime}`,
      `build=${formatTimestampDisplay(snapshot.app.buildTime)}`,
      `update_status=${snapshot.update.status}`,
      `update_latest=${snapshot.update.latestVersion ?? snapshot.app.version}`,
      `update_published=${formatTimestampDisplay(snapshot.update.latestPublishedAt)}`,
      `update_checked=${formatTimestampDisplay(snapshot.update.lastCheckedAt)}`,
    ].join('\n'),
    summary: defaultSummary,
    title: snapshot.app.name,
    updateMessage: snapshot.update.message,
  };
};
