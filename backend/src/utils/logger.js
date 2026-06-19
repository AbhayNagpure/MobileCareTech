import winston from 'winston';

const { combine, timestamp, printf, colorize } = winston.format;

// Define custom log format
const logFormat = printf(({ level, message, timestamp, stack }) => {
  return `${timestamp} ${level}: ${stack || message}`;
});

export const logger = winston.createLogger({
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  format: combine(
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.errors({ stack: true }),
    logFormat
  ),
  transports: [
    // Output logs to the console with colors
    new winston.transports.Console({
      format: combine(colorize(), logFormat),
    }),
    // Save errors to error.log
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    // Save all logs to combined.log
    new winston.transports.File({ filename: 'logs/combined.log' }),
  ],
});
