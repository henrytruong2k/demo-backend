import { createClient } from "@redis/client";
import dotenv from "dotenv";
dotenv.config();

const redisClient = createClient({
  url: `${process.env.REDIS_URL}`,
});

(async () => {
  redisClient.on("error", (error) => console.error(`${error}`));

  await redisClient.connect();

  console.log("Redis Connected");

  await redisClient.set("key", "Hello world");
})();

export default redisClient;
