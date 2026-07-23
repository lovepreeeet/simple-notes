import { config } from "dotenv";
import { resolve } from "path";
import { envSchema } from "./env.schema";

class Env {
    public loadEnv() {
        const envPath = this.getEnvPath();
        config({ path: envPath })

        const parsed = envSchema.safeParse(process.env);

        if (!parsed.success) {
            console.error("Invalid env", parsed.error.format());
            process.exit(1);
        }
        return parsed.data;
    }

    private getEnvPath() {
        const env = process.env.NODE_ENV || "local";
        return resolve(process.cwd(), `.env.${env}`);
    }
}

export const env = new Env().loadEnv();