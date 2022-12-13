import jwt from "jsonwebtoken";
import redisClient from "../config/redis.js";

export const verifyToken = async (req, res, next) => {
  try {
    // Bearer token string
    const token = req.headers.authorization?.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    req.userData = decoded;
    req.token = token;
    // verify blacklisted access token.
    const blackListToken = await redisClient.get(
      "BL_" + decoded.sub.toString()
    );

    if (blackListToken === token)
      return res
        .status(401)
        .json({ status: false, message: "blacklisted token." });

    next();
  } catch (error) {
    return res.status(401).json({
      status: false,
      message: "Your session is not valid.",
      data: error,
    });
  }
};

export const verifyRefreshToken = async (req, res, next) => {
  const token = req.body.token;

  if (token === null)
    return res.status(401).json({ status: false, message: "Invalid request." });
  try {
    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    req.userData = decoded;

    // verify if token is in store or not
    const refreshTokenCache = await redisClient.get(decoded.sub.toString());

    if (refreshTokenCache === null)
      return res.status(401).json({
        status: false,
        message: "Invalid request. Token is not in store.",
      });
    if (JSON.parse(refreshTokenCache).token !== token)
      return res.status(401).json({
        status: false,
        message: "Invalid request. Token is not same in store.",
      });

    next();
  } catch (error) {
    return res.status(401).json({
      status: true,
      message: "Your session is not valid.",
      data: error,
    });
  }
};
