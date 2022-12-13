const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const { generateRefreshToken } = require("../utils/generateRefreshToken");
const redisClient = require("../config/redis");
const { TIME_EXPIRE } = require("../constants/expire.constants");

const authCtrl = {
  register: async (req, res) => {
    const { username, password } = req.body;
    try {
      const userExists = await User.findOne({ username });
      if (userExists) {
        return res.json({ status: false, message: "Username already used" });
      }
      const user = new User({
        username,
        password,
      });
      const saved_user = await user.save();
      return res.json({
        status: true,
        message: "Registered successfully.",
        data: {
          _id: saved_user._id,
          username: saved_user.username,
        },
      });
    } catch (error) {
      return res
        .status(400)
        .json({ status: false, message: "Something went wrong.", data: error });
    }
  },
  login: async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (user && user.matchPassword(password)) {
      const accessToken = jwt.sign(
        { sub: user._id },
        process.env.JWT_ACCESS_SECRET,
        { expiresIn: process.env.JWT_ACCESS_TIME }
      );
      const refreshToken = await generateRefreshToken(user._id);
      return res.json({
        status: true,
        message: "login success",
        data: {
          user: {
            _id: user._id,
            username: user.username,
          },
          accessToken,
          refreshToken,
        },
      });
    } else {
      return res
        .status(401)
        .json({ status: false, message: "Username or password is not valid." });
    }
  },
  logout: async (req, res) => {
    const user_id = req.userData.sub;
    const token = req.token;
    const tokenExp = req.userData.exp;

    // remove the refresh token
    await redisClient.del(user_id.toString());

    // blacklist current access token
    await redisClient.set("BL_" + user_id.toString(), token);
    redisClient.expireAt("BL_" + user_id.toString(), tokenExp);

    return res.json({ status: true, message: "Logout success." });
  },
  getToken: async (req, res) => {
    const user_id = req.userData.sub;
    const accessToken = jwt.sign(
      { sub: user_id },
      process.env.JWT_ACCESS_SECRET,
      { expiresIn: process.env.JWT_ACCESS_TIME }
    );
    const refreshToken = await generateRefreshToken(user_id);
    return res.json({
      status: true,
      message: "success",
      data: {
        accessToken,
        refreshToken,
      },
    });
  },
};

module.exports = authCtrl;
