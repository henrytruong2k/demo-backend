const redis = require("redis");
const dotenv = require("dotenv");
const { createClient } = require("@redis/client");
dotenv.config();

const redisClient = createClient({
  url: `${process.env.REDIS_URL}`
});

(async () => {
  redisClient.on("error", (error) => console.error(`Error : ${error}`));

  await redisClient.connect();

  console.log('Redis Connected')

  await redisClient.set('key', 'Hello world');
})();

module.exports = redisClient;
