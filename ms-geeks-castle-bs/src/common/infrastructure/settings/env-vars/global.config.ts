import { LogLevel } from '../../../domain/logger/logger.enum';
import {
  Environment,
  GlobalConfig,
  NodeEnv,
} from '../../../domain/envs/envs.model';

export default (): GlobalConfig => ({
  appName: process.env.APP_NAME || 'ms-geeks-castle-bs',
  environment: (process.env.ENVIRONMENT as Environment) || Environment.LOCAL,
  logLevel: (process.env.LOG_LEVEL as LogLevel) || LogLevel.TRACE,
  nodeEnv: (process.env.NODE_ENV as NodeEnv) || NodeEnv.DEVELOPMENT,
});
