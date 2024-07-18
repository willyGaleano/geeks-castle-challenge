import { LogLevel } from '../logger/logger.enum';

export enum Environment {
  LOCAL = 'LOCAL',
  QA = 'QA',
  STAGING = 'STG',
  PRODUCTION = 'PRD',
}
export const environmentValues: [string, string, string, string] = [
  Environment.LOCAL,
  Environment.QA,
  Environment.STAGING,
  Environment.PRODUCTION,
];

export enum NodeEnv {
  DEVELOPMENT = 'development',
  PRODUCTION = 'production',
}
export const nodeEnvValues: [string, string] = [
  NodeEnv.DEVELOPMENT,
  NodeEnv.PRODUCTION,
];

export interface GlobalConfig {
  appName: string;
  environment: Environment;
  logLevel: LogLevel;
  nodeEnv: NodeEnv;
}
