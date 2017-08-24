import winston from 'winston';

const { NODE_ENV, LOG_LEVEL } = process.env;
const DEV = NODE_ENV !== 'production';
const TEST = NODE_ENV === 'test';
const level = LOG_LEVEL || (TEST ? 'test' : 'info');

export const logger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)({
      level,
      colorize: DEV
    })
  ]
});
