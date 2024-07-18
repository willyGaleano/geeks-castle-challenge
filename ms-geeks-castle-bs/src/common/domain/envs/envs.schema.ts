import { z } from 'zod';
import { environmentValues, nodeEnvValues } from './envs.model';

export const CommonVariablesSchema = z
  .object({
    ENVIRONMENT: z.enum(environmentValues),
    NODE_ENV: z.enum(nodeEnvValues),
    LOG_LEVEL: z.string(),
    APP_NAME: z.string(),
    HTTP_PORT: z.coerce.number(),
  })
  .describe('CommonVariables');

export const FirebaseVariablesSchema = CommonVariablesSchema.merge(
  z.object({
    FIREBASE_PROJECT_ID: z.string(),
    FIREBASE_CLIENT_EMAIL: z.string(),
    FIREBASE_PRIVATE_KEY: z.string(),
    FIREBASE_DATABASE_URL: z.string(),
  }),
).describe('FirebaseVariables');

export const EnvironmentVariablesSchema = CommonVariablesSchema.merge(
  FirebaseVariablesSchema,
).describe('EnvironmentVariables');

export type EnvironmentVariables = z.infer<typeof EnvironmentVariablesSchema>;
