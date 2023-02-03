import { EnvSchema } from '../utils/process-env';

declare global {
  namespace NodeJS {
    interface ProcessEnv extends NodeJS.ProcessEnv, EnvSchema {}
  }
}

export {};
