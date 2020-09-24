const chalk = require("chalk");
const moment = require("moment");

/**
 * Log handler object
 *
 * @class Logger
 */
class Logger {
  static log(content, type = "log") {
    const timestamp = `[${moment().format("YYYY-MM-DD HH:mm:ss")} - ${type.toUpperCase()}]`;
    switch (type) {
      case "log":
        return console.log(`${chalk.blue(timestamp, content)}`);
      case "warn":
        return console.log(`${chalk.yellow(timestamp, content)}`);
      case "error":
        return console.log(`${chalk.red.bold(timestamp, content)}`);
      case "debug":
        return console.log(`${chalk.green.bold(timestamp, content)}`);
      case "cmd":
        return console.log(`${chalk.gray(timestamp, content)}`);
      case "ready":
        return console.log(`${chalk.black.bgGreen(timestamp, content)}`);

      default: throw new TypeError("Invalid log type! Types: log, warn, error, debug, cmd, ready.");
    }
  }

  static warn(content) {
    return this.log(content, "warn");
  }

  static error(content) {
    return this.log(content, "error");
  }

  static debug(content) {
    return this.log(content, "debug");
  }

  static cmd(content) {
    return this.log(content, "cmd");
  }

  static ready(content) {
    return this.log(content, "ready");
  }
}

module.exports = Logger;
