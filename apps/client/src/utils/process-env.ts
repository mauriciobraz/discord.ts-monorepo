import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["DEVELOPMENT", "PRODUCTION"]).default("DEVELOPMENT"),
});

export type EnvSchema = z.infer<typeof envSchema>;
export const { NODE_ENV } = envSchema.parse(process.env);
