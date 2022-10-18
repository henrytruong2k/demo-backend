const redis = require('redis');

let redisClient;

(async () => {
    redisClient = redis.createClient(process.env.REDIS_PORT, process.env.REDIS_HOST);

    redisClient.on("error", (error) => console.error(`Error : ${error}`));

    redisClient.on("connect", () => console.log(`Redis connected on ${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`));

    await redisClient.connect();
})();

module.exports = redisClient;