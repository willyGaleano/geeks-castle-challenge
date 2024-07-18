import { ConfigService } from '@nestjs/config';
import { Environment, GlobalConfig } from '../../../domain/envs/envs.model';

export const getConfigLogger = (configService: ConfigService<GlobalConfig>) => {
  const appName = configService.get<string>('appName');
  const currentEnvironment = configService.get<string>('environment');
  const logLevel = configService.get<string>('logLevel');

  return {
    pinoHttp: {
      name: appName,
      level: logLevel,
      autoLogging: false,
      serializers: {
        req: () => undefined,
        res: () => undefined,
      },
      messageKey: 'msg',
      transport:
        currentEnvironment !== Environment.PRODUCTION
          ? {
              target: 'pino-pretty',
              options: { colorize: true, messageKey: 'msg' },
            }
          : undefined,
    },
  };
};
