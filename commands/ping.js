const Command = require('../modules/Command');

/**
 * Class representing the ping command
 *
 * @class Ping
 * @extends {Command} See Command.js docs for more info.
 */
class Ping extends Command {
  constructor(client) {
    super(client, {
      name: "Ping",
      description: "Test bot latency. The Hello World! of commands",
      enabled: true,
      usage: `${client.config.prefix}ping`,
      aliases: ["pong"],
      permissionLevel: "User",
    });
  }

  async run(message, args, level) {
    try {
      this.log(message);
      const msg = await message.channel.send("Ping!");
      msg.edit(`Pong! (Latency:  ${msg.createdTimestamp - message.createdTimestamp}ms.)`)
    } catch (e) {
      super.run(message);
      this.client.logger.error(e);
    }
  }
}

module.exports = Ping;
