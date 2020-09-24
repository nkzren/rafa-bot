module.exports = class {
  constructor(client) {
    this.name = 'ready';
    this.client = client;
  }

  /**
   * Ready event function
   *
   */
  async run() {
    // Await para esperar as infos das guildas do client (as vezes vem antes do 'ready')
    await setTimeout(() => console.log("Waiting for data..."), 1000);

    //Atualiza as infos do bot periodicamente
    this.client.appInfo = await this.client.fetchApplication();
    setInterval(async () => {
      this.client.appInfo = await this.client.fetchApplication();
    }, 60000);

    this.client.user.setActivity(`use '${this.client.config.prefix}help' for more info`);
    this.client.logger.log(`Logged in as ${this.client.user.tag}!`, "ready");
  }
}
