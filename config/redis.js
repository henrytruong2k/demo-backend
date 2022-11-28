const redis = require("redis");
const dotenv = require("dotenv");
dotenv.config();

let redisClient;

(async () => {
  const redisURL = `redis://${process.env.REDISUSER}:${process.env.REDISPASSWORD}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`;
  redisClient = redis.createClient({ url: redisURL });

  redisClient.on("error", (error) => console.error(`Error : ${error}`));

  redisClient.on("connect", () =>
    console.log(
      `Redis connected on ${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`
    )
  );

  await redisClient.connect();
})();

module.exports = redisClient;
