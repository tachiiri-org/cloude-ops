import type { AppMetadata } from '@shared/app-metadata';
import type { RuntimeSnapshot } from '@shared/runtime-snapshot';

export type DesktopApi = {
  readonly getAppMetadata: () => AppMetadata;
  readonly getRuntimeSnapshot: () => Promise<RuntimeSnapshot>;
  readonly onRuntimeSnapshot: (listener: (snapshot: RuntimeSnapshot) => void) => () => void;
};

declare global {
  interface Window {
    desktop?: DesktopApi;
  }
}
