const Command = require('../modules/Command');

/**
 * Class representing the meet command
 *
 * @class Meet
 * @extends {Command} See Command.js docs for more info.
 */
class Meet extends Command {
  constructor(client) {
    super(client, {
      name: "Meet",
      // description: "Test bot latency. The Hello World! of commands",
      // enabled: true,
      // usage: `${client.config.prefix}ping`,
      // aliases: ["pong"],
      permissionLevel: "User",
    });
  }

  async run(message, args, level) {
    try {
      this.log(message);
    } catch (e) {
      super.run(message);
      this.client.logger.error(e);
    }
  }
}

module.exports = Meet;
