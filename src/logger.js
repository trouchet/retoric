import { createLogger, format, transports } from "winston";
import logger from "morgan";

const { label } = format;

/*
  We may define our own logging level. The default are given below
  by property config.syslog.levels
  const my_levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    verbose: 4,
    debug: 5,
    silly: 6
  };
*/

const timestampConfig = { format: "DD/MM/YYYY HH:mm:ss.sss A" };
const transports_ = [new transports.Console({ format: format.errors() })];

/**
 * @abstract Log to defined transports
 *
 * @param {String} label_msg
 */
const logging = (labelMessage = "default") => {
  const formatHandler = (info) =>
    `[${info.timestamp} - ${labelMessage}] ${info.level}: ${info.message}`;

  const formatConfig = format.combine(
    label({ label: labelMessage }),
    format.timestamp(timestampConfig),
    format.colorize(),
    format.printf(formatHandler),
  );

  const loggerConfig = {
    format: formatConfig,
    transports: transports_,
    exceptionHandlers: transports_,
    rejectionHandlers: transports_,
  };

  return createLogger(loggerConfig);
};

/**
 * @abstract log message through transport using custom logger
 *
 */
export const logMessage = (logger, level, message) => logger.log(level, message);

/**
 * @abstract reporter for messages
 *
 */
export const reporter = logging("morgan");

/**
 * @abstract log message through transport using reporter logger
 *
 */
export const log = (type, msg) => logMessage(reporter, type, msg);

const requestFormat = ":method :url :status :res[content-length] - :response-time ms";
const logMiddlewareConfig = {
  stream: {
    // Configure Morgan to use our custom logger with the http severity
    write: (message) => reporter.log("info", message),
  },
};

/**
 * @abstract Morgan middleware to log app access
 *
 */
export const morganMiddleware = logger(requestFormat, logMiddlewareConfig);
