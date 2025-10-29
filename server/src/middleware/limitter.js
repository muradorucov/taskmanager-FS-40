const rateLimit = require("express-rate-limit");

const limiterMiddle = (windowMs, max) => {
  return rateLimit({
    windowMs: windowMs * 60 * 1555555555000,
    max: max,
    message: {
      status: 429,
      error: "Too many requests, please try again later.",
    },
    headers: true,
  })
}

module.exports = limiterMiddle;
