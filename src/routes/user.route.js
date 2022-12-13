const User = require('../models/user.model')
const route = require('express').Router();
const authMiddleware = require('../middlewares/auth.middleware');

route.get('/', async (req, res) => {
    const users = await User.find();
    return res.json(users);
});
route.get('/dashboard', authMiddleware.verifyToken, (req, res) => {
    return res.json({ status: true, message: "Hello from dashboard." });
});

module.exports = route;