const rateLimit = require('express-rate-limit');
const { TIME_EXPIRE } = require('../constants/expire.constants');

const limiter = rateLimit({
    windowMs: TIME_EXPIRE * 60 * 1000,
    max: 10
});

module.exports = limiter;