import './styles.css';

import type { AppMetadata } from '@shared/app-metadata';
import type { RuntimeSnapshot } from '@shared/runtime-snapshot';

declare global {
  interface Window {
    desktop?: {
      getAppMetadata: () => AppMetadata;
      getRuntimeSnapshot: () => Promise<RuntimeSnapshot>;
      onRuntimeSnapshot: (listener: (snapshot: RuntimeSnapshot) => void) => () => void;
    };
  }
}

const bindText = (elementId: string, value: string): void => {
  const element = document.getElementById(elementId);

  if (element) {
    element.textContent = value;
  }
};

const showBootstrapError = (message: string): void => {
  const element = document.getElementById('bootstrap-error');

  if (element) {
    element.textContent = message;
    element.hidden = false;
  }
};

const formatDateTime = (value: string | null): string => {
  if (!value) {
    return 'Pending';
  }

  const date = new Date(value);

  return Number.isNaN(date.getTime()) ? value : date.toISOString().replace('.000Z', 'Z');
};

const applyRuntimeSnapshot = (snapshot: RuntimeSnapshot): void => {
  bindText('app-name', snapshot.app.name);
  bindText('app-channel', snapshot.app.channel);
  bindText('app-environment', snapshot.app.environment);
  bindText('app-version', snapshot.app.version);
  bindText('app-runtime', snapshot.app.runtime);
  bindText('app-build-time', formatDateTime(snapshot.app.buildTime));
  bindText('update-status', snapshot.update.status);
  bindText('update-message', snapshot.update.message);
  bindText('update-last-checked', formatDateTime(snapshot.update.lastCheckedAt));
  bindText('update-latest-version', snapshot.update.latestVersion ?? snapshot.app.version);
  bindText('update-latest-published', formatDateTime(snapshot.update.latestPublishedAt));
};

if (!window.desktop) {
  showBootstrapError('Desktop bridge is unavailable.');
  throw new Error('Desktop bridge is unavailable.');
}

void window.desktop
  .getRuntimeSnapshot()
  .then(applyRuntimeSnapshot)
  .catch((error: unknown) => {
    const message = error instanceof Error ? error.message : 'Runtime snapshot is unavailable.';

    showBootstrapError(message);
  });

window.desktop.onRuntimeSnapshot(applyRuntimeSnapshot);
