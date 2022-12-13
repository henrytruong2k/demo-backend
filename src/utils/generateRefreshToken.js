const redisClient = require("../config/redis");
const jwt = require("jsonwebtoken");

const generateRefreshToken = async (user_id) => {
  const refreshToken = jwt.sign(
    { sub: user_id },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: process.env.JWT_REFRESH_TIME }
  );
  await redisClient.set(
    user_id.toString(),
    JSON.stringify({ token: refreshToken })
  );
  return refreshToken;
};

module.exports = { generateRefreshToken };
