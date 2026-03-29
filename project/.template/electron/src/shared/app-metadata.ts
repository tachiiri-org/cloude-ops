declare const __APP_CHANNEL__: string | undefined;
declare const __APP_BUILD_TIME__: string | undefined;
declare const __APP_VERSION__: string | undefined;

export type AppChannel = 'dev' | 'stable';
export type AppEnvironment = 'development' | 'production';
export type UpdateProvider = 'github';

export type AppMetadata = {
  readonly buildTime: string;
  readonly channel: AppChannel;
  readonly environment: AppEnvironment;
  readonly name: string;
  readonly repositoryName: string;
  readonly repositoryOwner: string;
  readonly version: string;
  readonly runtime: 'electron';
  readonly updateOverrideUrl: string | null;
  readonly updateProvider: UpdateProvider;
};

const DEFAULT_APP_CHANNEL: AppChannel = 'dev';
const DEFAULT_BUILD_TIME = 'unconfigured';
const DEFAULT_APP_VERSION = '0.1.1';

const readEnvAppChannel = (): string | undefined => {
  const processValue = (globalThis as { process?: { env?: { APP_CHANNEL?: string } } }).process;

  return processValue?.env?.APP_CHANNEL;
};

const readEnvBuildTime = (): string | undefined => {
  const processValue = (globalThis as { process?: { env?: { APP_BUILD_TIME?: string } } }).process;

  return processValue?.env?.APP_BUILD_TIME;
};

const readEnvAppVersion = (): string | undefined => {
  const processValue = (globalThis as { process?: { env?: { APP_VERSION?: string } } }).process;

  return processValue?.env?.APP_VERSION;
};

const parseAppChannel = (value: string | undefined): AppChannel => {
  if (!value) {
    return DEFAULT_APP_CHANNEL;
  }

  if (value === 'dev' || value === 'stable') {
    return value;
  }

  throw new Error(`Unsupported APP_CHANNEL: ${value}`);
};

export const getAppChannel = (): AppChannel =>
  parseAppChannel(
    readEnvAppChannel() ??
      (typeof __APP_CHANNEL__ === 'string' && __APP_CHANNEL__.length > 0
        ? __APP_CHANNEL__
        : undefined),
  );

export const getAppEnvironment = (): AppEnvironment =>
  getAppChannel() === 'stable' ? 'production' : 'development';

export const getBuildTime = (): string => {
  const envBuildTime = readEnvBuildTime();

  if (envBuildTime) {
    return envBuildTime;
  }

  if (typeof __APP_BUILD_TIME__ === 'string' && __APP_BUILD_TIME__.length > 0) {
    return __APP_BUILD_TIME__;
  }

  return DEFAULT_BUILD_TIME;
};

export const getUpdateOverrideUrl = (): string | null => {
  const processValue = (globalThis as { process?: { env?: { APP_UPDATE_URL?: string } } }).process;
  const updateUrl = processValue?.env?.APP_UPDATE_URL;

  if (updateUrl && updateUrl.length > 0) {
    return updateUrl;
  }

  return null;
};

export const getAppVersion = (): string => {
  const envAppVersion = readEnvAppVersion();

  if (envAppVersion) {
    return envAppVersion;
  }

  if (typeof __APP_VERSION__ === 'string' && __APP_VERSION__.length > 0) {
    return __APP_VERSION__;
  }

  return DEFAULT_APP_VERSION;
};

export const getAppMetadata = (): AppMetadata => ({
  buildTime: getBuildTime(),
  channel: getAppChannel(),
  environment: getAppEnvironment(),
  name: '__APP_NAME__',
  repositoryName: '__REPO_NAME__',
  repositoryOwner: '__REPO_OWNER__',
  updateOverrideUrl: getUpdateOverrideUrl(),
  updateProvider: 'github',
  version: getAppVersion(),
  runtime: 'electron',
});
