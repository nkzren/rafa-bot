const Command = require("../modules/Command")

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
      description: "Creates a new category with one voice channel and one text channel, to make meetings",
      enabled: true,
      usage: `${client.config.prefix}meet`,
      aliases: ["call"],
      permissionLevel: "User",
    })
  }
  
  async run(message, args, level) {
    try {
      const dt = new Date()
      const channelManager = message.guild.channels
      const newName = "Auto Meet"
      const newCategory = await channelManager.create(newName, {
        type: "category",
      });
      channelManager.create(`${newName}-voice`, {
        type: "voice",
        parent: newCategory.id,
      })
      const newText = await channelManager.create(`${newName}${dt.getDate()}-${dt.getMonth() + 1}`, {
        type: "text",
        parent: newCategory.id,
      })

      newText.send("Bem-vindo, chefe! Estou terminando de arrumar a sala. Lembre-se de que ela será deletada após todos saírem dela, então guarde suas coisas antes disso.")
    } catch (e) {
      super.run(message)
      this.client.logger.error(e)
    }
  }
}

module.exports = Meet
