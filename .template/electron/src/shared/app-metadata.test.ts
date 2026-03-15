import { afterEach, describe, expect, it, vi } from 'vitest';

import { getAppChannel, getAppMetadata } from './app-metadata';

const currentVersion = '0.1.1';

afterEach(() => {
  vi.unstubAllEnvs();
});

describe('getAppMetadata', () => {
  it('returns the baseline desktop runtime metadata', () => {
    vi.stubEnv('APP_CHANNEL', '');
    vi.stubEnv('APP_BUILD_TIME', '');
    vi.stubEnv('APP_UPDATE_URL', '');
    vi.stubEnv('APP_VERSION', '');

    expect(getAppMetadata()).toEqual({
      buildTime: 'unconfigured',
      channel: 'dev',
      environment: 'development',
      name: '__APP_NAME__',
      repositoryName: '__REPO_NAME__',
      repositoryOwner: '__REPO_OWNER__',
      updateOverrideUrl: null,
      updateProvider: 'github',
      version: currentVersion,
      runtime: 'electron',
    });
  });

  it('reads the configured stable release channel', () => {
    vi.stubEnv('APP_CHANNEL', 'stable');
    vi.stubEnv('APP_BUILD_TIME', '2026-03-15T00:00:00.000Z');
    vi.stubEnv('APP_UPDATE_URL', 'https://example.test/update-stable');
    vi.stubEnv('APP_VERSION', '0.2.0');

    expect(getAppMetadata()).toEqual({
      buildTime: '2026-03-15T00:00:00.000Z',
      channel: 'stable',
      environment: 'production',
      name: '__APP_NAME__',
      repositoryName: '__REPO_NAME__',
      repositoryOwner: '__REPO_OWNER__',
      updateOverrideUrl: 'https://example.test/update-stable',
      updateProvider: 'github',
      version: '0.2.0',
      runtime: 'electron',
    });
  });
});

describe('getAppChannel', () => {
  it('fails closed on unsupported channels', () => {
    vi.stubEnv('APP_CHANNEL', 'preview');

    expect(() => getAppChannel()).toThrowError('Unsupported APP_CHANNEL: preview');
  });
});
