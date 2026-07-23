import { createClient, RedisClientType } from "redis";
import { env } from "../config";

class RedisHelper {
    public client: RedisClientType = createClient({ url: env.REDIS_URL })

    constructor() {
        this.client.on("error", error => {
            console.log(`Redis Client Error`, error);
        })
    }

    public async connect() {
        if (!this.client.isOpen) {
            await this.client.connect();
        }
    }

    public async disconnect() {
        if (this.client.isOpen) {
            this.client.quit();
        }
    }

    private generateKey(module: string, key: string) {
        return `${module}:${key}`
    }

    public async get<T>(module: string, key: string): Promise<T | null> {
        try {
            let data = await this.client.get(this.generateKey(module, key));
            if (!data) return null;
            try {
                return JSON.parse(data);
            } catch (error) {
                return data as T;
            }
        } catch (error) {
            console.error("Redis GET error:", error);
            return null;
        }
    }

    public async set(module: string, key: string, value: unknown, ttlSeconds: number = 60 * 60) {
        try {
            let stringifyValue = typeof value === "string" ? value : JSON.stringify(value);
            let redisKey = this.generateKey(module, key);

            if (ttlSeconds) {
                return await this.client.set(redisKey, stringifyValue, { expiration: { type: "EX", value: ttlSeconds } })
            }

            await this.client.set(redisKey, stringifyValue);
        } catch (error) {
            console.error("Redis SET error:", error);
            return null;
        }
    }

    public async del(module: string, key: string) {
        let redisKey = this.generateKey(module, key);

        return await this.client.del(redisKey);
    }
}


export default new RedisHelper();