"use strict"
const { Client, Collection } = require('discord.js');
const readdir = require('util').promisify(require('fs').readdir);
const Logger = require('./modules/Logger');
const klaw = require('klaw');
const path = require("path");

/**
 * Custom client made for this bot.
 *
 * @class ProtoBot
 * @extends {Client} See discord.js docs for more info
 */
class ProtoBot extends Client {
  constructor(options) {
    super(options);

    this.logger = Logger;

    // Bot config file. 
    // Bot prefix and token are stored here
    this.config = require('./config');

    // Creates the Collection objects for the commands and the aliases
    this.commands = new Collection();
    this.aliases = new Collection();
    this.permissionLevels = require('./modules/Permissions')

  }

  checkMemberLevel(message) {
    let permLevel = 0;
    const permissionLevels = require('./modules/Permissions').sort((a, b) => a.level - b.level);
    while (permissionLevels.length) {
      const permission = permissionLevels.pop();
      if (message.guild && permission.check(message)) {
        permLevel = permission.level;
        break;
      }
    }
    return permLevel;
  }

  /**
   * Loads commands from ./commands folder
   *
   * @param {String} commandPath
   * @param {String} commandName
   * @returns String with error StackTrace, false otherwise
   * @memberof ProtoBot
   */
  loadCommand(commandPath, commandName) {
    try {
      const props = new (require(`${commandPath}${path.sep}${commandName}`))(this);
      this.logger.log(`Loading Command: ${props.help.name}.`);
      props.options.location = commandPath;

      // Maps command name and its aliases
      this.commands.set(props.name, props);
      props.options.aliases.forEach(alias => {
        this.aliases.set(alias, props.name);
      });
      return false;
    } catch (e) {
      return `Error loading command ${commandName}: ${e}`;
    }
  }

  /**
   * Unloads commands
   *
   * @param {String} commandPath
   * @param {String} commandName
   * @returns String with message if command/aliases don't exist, false otherwise
   * @memberof ProtoBot
   */
  async unloadCommand(commandPath, commandName) {
    let command;
    if (this.commands.has(commandName)) {
      command = this.commands.get(commandName);
    } else if (this.aliases.has(commandName)) {
      command = this.commands.get(this.aliases.get(commandName));
    }

    if (!command) return `The command \`${commandName}\` doesn't exist.`;

    delete require.cache[require.resolve(`${commandPath}${path.sep}${commandName}.js`)];
    return false;
  }
}

const client = new ProtoBot();

/**
 * Initializes the bot.
 */
const init = async () => {
  loadCommands();
  await loadEvents();

  client.login(require('./token.json').token);
}

init();

client.on("disconnect", () => client.logger.warn("Bot disconnected!"))
  .on("reconnecting", () => client.logger.ready("Bot reconnected!"))
  .on("error", e => client.logger.error(e))
  .on("warn", info => client.logger.warn(info))
  .on("ready", () => client.user.setActivity("Commands", {type: "LISTENING"}))

/**
 * Loads function commands contained in the ./commands folder.
 * Commands must have the name property for logging purposes
 */
function loadCommands() {
  klaw("./commands").on("data", item => {
    const cmdFile = path.parse(item.path);
    if (!cmdFile.ext || cmdFile.ext !== ".js")
      return;
    const response = client.loadCommand(cmdFile.dir, `${cmdFile.name}${cmdFile.ext}`);
    if (response)
      client.logger.error(response);
  });
}

/**
 * Reads the entire ./events folder and sets the event function.
 * Event modules constructor MUST have a 'name' property with the exact name of the event
 */
async function loadEvents() {
  const eventFiles = await readdir('./events/');
  client.logger.log(`Events loaded: ${eventFiles.length}`);
  eventFiles.forEach(file => {
    const event = new (require(`./events/${file}`))(client);
    client.logger.log(`Loading event: ${event.name}`);
    client.on(event.name.toLowerCase(), (...args) => event.run(...args));
    delete require.cache[require.resolve(`./events/${file}`)];
  });
}
