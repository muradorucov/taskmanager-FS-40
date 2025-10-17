const { createLogger, format, transports } = require("winston");
const { combine, timestamp, printf, colorize } = format;

const logFormat = printf(({ level, message, timestamp, meta }) => {
  return `${timestamp} [${level.toUpperCase()}]: ${message} ${meta ? JSON.stringify(meta) : ""
    }`;
});

const logger = createLogger({
  level: "info",
  format: combine(timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), logFormat),
  transports: [
    new transports.Console({
      format: combine(colorize(), timestamp(), logFormat),
    }),
    new transports.File({ filename: "src/logs/error.log", level: "error" }),
    new transports.File({ filename: "src/logs/warn.log", level: "warn" }),
    new transports.File({ filename: "src/logs/info.log", level: "info" }),
  ],
});

const loggerMiddleware = (req, res, next) => {
  logger.info(`Request: ${req.method} ${req.originalUrl}`, {
    ip: req.ip,
    userAgent: req.headers["user-agent"],
  });
  next();
};

module.exports = { logger, loggerMiddleware };
