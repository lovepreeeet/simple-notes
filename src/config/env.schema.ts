import z from "zod";
import { ENV_MESSAGES } from "../constants/messages";

export const envSchema = z.object({
  NODE_ENV: z.enum(["local", "dev", "prod"]).default("local"),
  PORT: z.string().default("3000").transform(value => Number(value)),
  HOST_NAME: z.string(ENV_MESSAGES.HOSTNAME_REQUIRED).min(1),
  DB_NAME: z.string(ENV_MESSAGES.DBNAME_REQUIRED).min(1),
  PASSWORD: z.string(ENV_MESSAGES.PASSWORD_REQUIRED).min(1),
  USER_NAME: z.string(ENV_MESSAGES.USERNAME_REQUIRED).min(1),
  DB_PORT: z.string().default("5432"),
  JWT_SECRET: z.string(ENV_MESSAGES.JWT_SECRET_REQUIRED).min(32),
  JWT_EXPIRES_IN: z.string().optional().default("7d"),

  REDIS_URL: z.string(ENV_MESSAGES.REDIS_URL_REQUIRED),
})