import { format, transports, createLogger } from "winston"

const printFormat = format.printf(({ timestamp, level, message }) => {
  return `[${new Date(timestamp).toLocaleTimeString()}] ${level}: ${message}`
})

class Logger {
  static logger

  constructor() {
    this.logger = createLogger({
      format: format.combine(
        format.timestamp(),
        format.colorize(),
        printFormat,
      ),
      colorize: true,
      transports: [
        new transports.Console()

      ],
      exitOnError: false, // do not exit on handled exceptions
    });
  }

  basicLog(methodLevel, message) {
    this.logger.log(methodLevel, message)
  }

  logWithInstanceMethod(message, data, methodLevel) {
    var errorMessage = {}
    if (!!data) {
      errorMessage = {err: data}
    }
    if (Object.keys(errorMessage).length == 0) {
      this.basicLog(methodLevel, `${message}`);
    } else {
      this.basicLog(methodLevel, `${message} !DATA! ${JSON.stringify(errorMessage)}`);
      console.log(data)
    }
  }
  info(message, payload) {
    this.logWithInstanceMethod(message, payload, 'info');
  }

  warn(message, payload) {
    this.logWithInstanceMethod(message, payload, 'warn');
  }
  error(message, payload) {
    this.logWithInstanceMethod(message, payload, 'error');
  }
  debug(message, payload) {
    this.logWithInstanceMethod(message, payload, 'debug');
  }
}

export const wlf = new Logger()