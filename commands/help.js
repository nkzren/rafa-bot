const Command = require('../modules/Command');

/**
 * Class representing the help command
 *
 * @class Help
 * @extends {Command} See Command.js docs for more info.
 */
class Help extends Command {
  constructor(client) {
    let prefix = client.config.prefix
    super(client, {
      name: "Help",
      description: "Display help messages",
      enabled: true,
      usage: `${prefix}help OR ${prefix}help <commandName>`,
      aliases: ["ajuda", "socorro"],
      permissionLevel: "User",
    })
  }

  async run(message, args, level) {
    try {
      this.log(message)
      if (args.length) {
        let commandName = args[0].toLowerCase()
        const command = this.client.commands.get(commandName)

        let helpMsg = 'Command not found!'
        if (command) {
          helpMsg = command.helpMsg()
        }
        const msg = await message.channel.send(helpMsg)
      } else {
        const msg = await message.channel.send(helpListAll(this.client))
      }
    } catch (e) {
      super.run(message);
      this.client.logger.error(e);
    }
  } 
}

function helpListAll(client) {
  let string = client.commands.reduce((result, command) => {
    return `${result}\n${command.helpMsgList()}`
  }, `\`\`\``)
  string += `\n\`\`\``

  return string
}

module.exports = Help
