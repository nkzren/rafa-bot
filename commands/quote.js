const Command = require('../modules/Command');
const axios = require('axios')

/**
* Class representing the ping command
*
* @class Quote
* @extends {Command} See Command.js docs for more info.
*/
class Quote extends Command {
  constructor(client) {
    super(client, {
      name: "Quote",
      description: "Gets a random motivational quote",
      enabled: true,
      usage: `${client.config.prefix}quote`,
      aliases: ["coach", "dailymessage", "inspireme"],
      permissionLevel: "User",
    });
    this.loadQuotes()
  }
  
  async run(message, args, level) {
    try {
      this.log(message);
      if (!this.quotes.length) {
        this.loadQuotes()
      }
      let quote = this.quotes[Math.floor(Math.random() * this.quotes.length)]
      message.channel.send(`\`"${quote.text}" ~${quote.author || "Anonymous"}\``)
    } catch (e) {
      super.run(message);
      this.client.logger.error(e);
    }
  }

  async loadQuotes() {
    let response = await axios.get("https://type.fit/api/quotes")
    this.quotes = response.data
  }
}

module.exports = Quote;
