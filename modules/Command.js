/**
 * Parent command class. Every command must inherit this class
 *
 * @class Command
 */
class Command {
  constructor(client, {
    name = null,
    description = "Coming soon...",
    usage = "No usage provided",
    enabled = false,
    aliases = [],
    permissionLevel = "User",
  }) {
    this.name = name.toLowerCase();
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
  log(message = null) {
    let logMsg = `Running command: ${this.name}`
    if (message) {
      logMsg += ` from ${message.guild.name} - ${message.guild.id} by User: ${message.author.username} - ${message.author.id}`;
    }

    this.client.logger.log(logMsg);
  }

  helpMsgList() {
    return `${this.name}: ${this.help.description}`
  }

  helpMsg() {
    return `${this.help.name} command usage: \`\`\`${this.help.usage}\`\`\``
  }
}

module.exports = Command;
