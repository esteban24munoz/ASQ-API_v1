//FROM DR.FOUST
//logger.js winston logger

const winston = require('winston');
const {MESSAGE} = require('triple-beam');
const config = require('./config.js');

const levels = {
  silent: 0,
  error: 1,
  warn: 2,
  http: 3,
  info: 4,
  debug: 5,
  verbose: 6
};

const colors = {
  error: 'red',
  warn: 'yellow',
  http: 'cyan',
  info: 'green',
  debug: 'blue',
  verbose: 'grey',
};

const traceErrors = winston.format(function traceErrors(info) {
  if (info instanceof Error) {
    info.message = info.stack;
  }
  return info;
});

const toJsonString = winston.format(function toJsonString(info) {
  if (typeof info.message !== 'string') {
    info.message = JSON.stringify(info.message);
  }
  return info;
});

const fixCli = winston.format(function fixCli(info) {
  let msg = info[MESSAGE];
  let match = msg.match(/^(.{5})(\w+)(.{5}): ( *)([^]*?)\n?$/);
  if (match) {
    info[MESSAGE] = match[1] + '[' + match[2] + match[4] + ']' + match[3] + ' ' + match[5];
  }
  return info;
});

const logger = winston.createLogger({
  levels,
  level: config.logLevel,
  format: winston.format.combine(
    traceErrors(),
    toJsonString(),
    winston.format.cli({ levels, colors }),
    fixCli(),
  ),
  transports: new winston.transports.Console(),
});

logger.httpStream = {
  write(message) { logger.http(message); }
};


module.exports = logger;