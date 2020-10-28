const Command = require("../modules/Command")

/**
 * Class representing the poll command
 *
 * @class Poll
 * @extends {Command} See Command.js docs for more info.
 */
class Poll extends Command {
  constructor(client) {
    super(client, {
      name: "Poll",
      description: "Creates a poll for users to vote. 4 options maximum",
      enabled: false,
      usage: `${client.config.prefix}poll "Ask something" "option1" "option2" "option3" "option4"`,
      aliases: ["enquete"],
      permissionLevel: "User",
    })
  }

  async run(message, args, level) {
    try {
    } catch (e) {
      super.run(message)
      this.client.logger.error(e)
    }
  }

  parseToArgs(message) {
    let args = msg.content
      .slice(client.config.prefix.length)
      .trim()
      .split('"')
      .filter((phrase) => phrase.trim() !== "")

    args.map(e => e.trim())
    
    if (args[0].startsWith("end")) {
        
    }
  }
}

module.exports = Poll
