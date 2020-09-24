/**
 * Parent command class. Every command must inherit this class
 *
 * @class Command
 */
class Command {
  constructor(client, {
    name = null,
    description = "No description.",
    usage = "No usage provided",
    enabled = false,
    aliases = [],
    permissionLevel = "User",
  }) {
    this.name = name;
    this.client = client;
    this.options = { enabled, aliases, permissionLevel };
    this.help = { name, description, usage };
  }

  /**
   * Command main function. Must be overriden by children classes.
   * Throws an error otherwise
   * 
   * @param {Message} message Message object with all message info. See discord.js docs
   * @param {Array<String>} args Array with the command arguments, if any.
   * @param {String} level Command permission level
   * @memberof Command
   */
  async run(message, args, level) {
    throw new Error("Faz certo que dá certo")
  }

  /**
   * Simple function for command call logging
   *
   * @memberof Command
   */
  log() {
    this.client.logger.log(`Running command: ${this.name}`);
  }
}

module.exports = Command;
