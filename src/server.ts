import { env } from "./config";

import app from "./app";
import { applyAssociations } from "./database/models/associations";
import redisHelper from "./helpers/redis.helper";

let PORT = env.PORT;

class Server {
    public async start() {
        try {
            applyAssociations();
            await redisHelper.connect();
            app.listen(PORT, async () => {
                console.log(`Server running on port ${PORT}`)
            })
        } catch (error) {
            console.log('error: ', error);
        }
    }
}

new Server().start();