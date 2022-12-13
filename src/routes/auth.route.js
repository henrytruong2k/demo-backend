const userCtrl = require('../controllers/auth.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const route = require('express').Router();


route.post('/register', userCtrl.register);
route.post('/login', userCtrl.login);
route.post('/logout', authMiddleware.verifyToken, userCtrl.logout);
route.post('/refresh-token', authMiddleware.verifyRefreshToken, userCtrl.getToken);

module.exports = route;