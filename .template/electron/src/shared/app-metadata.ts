declare const __APP_CHANNEL__: string | undefined;
declare const __APP_BUILD_TIME__: string | undefined;
declare const __APP_UPDATE_URL__: string | undefined;
declare const __APP_VERSION__: string | undefined;

export type AppChannel = 'dev' | 'stable';
export type AppEnvironment = 'development' | 'production';

export type AppMetadata = {
  readonly buildTime: string;
  readonly channel: AppChannel;
  readonly environment: AppEnvironment;
  readonly name: string;
  readonly version: string;
  readonly runtime: 'electron';
  readonly updateBaseUrl: string | null;
};

const DEFAULT_APP_CHANNEL: AppChannel = 'dev';
const DEFAULT_BUILD_TIME = 'unconfigured';
const DEFAULT_APP_VERSION = '__CURRENT_VERSION__';

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

export const getUpdateBaseUrl = (): string | null => {
  const processValue = (globalThis as { process?: { env?: { APP_UPDATE_URL?: string } } }).process;
  const updateUrl = processValue?.env?.APP_UPDATE_URL;

  if (updateUrl && updateUrl.length > 0) {
    return updateUrl;
  }

  if (typeof __APP_UPDATE_URL__ === 'string' && __APP_UPDATE_URL__.length > 0) {
    return __APP_UPDATE_URL__;
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
  updateBaseUrl: getUpdateBaseUrl(),
  version: getAppVersion(),
  runtime: 'electron',
});
