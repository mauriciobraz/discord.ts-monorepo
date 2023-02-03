import { z } from 'zod';

// !!! DON'T CHANGE THE ORDER OF THIS ARRAY.
const LOG_LEVELS = [
  'SILLY',
  'TRACE',
  'DEBUG',
  'INFO',
  'WARN',
  'ERROR',
  'FATAL',
] as const;

const envSchema = z.object({
  NODE_ENV: z.enum(['DEVELOPMENT', 'PRODUCTION']).default('DEVELOPMENT'),

  DISCORD_TOKEN: z
    .string()
    .regex(/(^[\w-]*\.[\w-]*\.[\w-]*$)/, 'Should be a valid JWT token.'),

  LOG_LEVEL: z
    .enum(LOG_LEVELS)
    .default('INFO')
    .transform((value) => LOG_LEVELS.indexOf(value)),

  SAVE_LOGS: z
    .enum(['true', 'false'])
    .default('false')
    .transform((value) => value === 'true'),
});

export type EnvSchema = z.infer<typeof envSchema>;

export const { DISCORD_TOKEN, LOG_LEVEL, NODE_ENV, SAVE_LOGS } =
  envSchema.parse(process.env);
