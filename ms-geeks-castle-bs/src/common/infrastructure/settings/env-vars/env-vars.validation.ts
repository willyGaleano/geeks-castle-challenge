import { z } from 'zod';
import { Logger } from 'nestjs-pino';
import { EnvironmentVariablesSchema } from '../../../domain/envs/envs.schema';

export const validateEnvironment = (
  configuration: Record<string, unknown>,
  logger: Logger,
) => {
  try {
    return EnvironmentVariablesSchema.parse(configuration);
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      const pathErros = error.errors.map((err) => err.path.join('.'));

      logger.warn({
        msg: `Environment variables don't match the schema: ${pathErros.join(', ')}`,
      });
    } else {
      logger.error({
        msg: 'Error validating environment variables',
        error,
      });
    }
    return true;
  }
};
