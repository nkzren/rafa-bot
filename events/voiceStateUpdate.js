module.exports = class {
  constructor(client) {
    this.name = "voiceStateUpdate"
    this.client = client
  }

  async run(oldState, newState) {
    // Channel Leave
    if (oldState) {
      const channel = oldState.channel
      if (channel && channel.parent.name === "Auto Meet" && !channel.members.size) {
        // Join
        this.client.logger.warn("Deleting all automeet channels")
        const parentChannel = channel.parent
        parentChannel.children.each((channel) => {
          channel.delete("Deleting automeet channel")
        })
        parentChannel.delete("Deleting automeet channel")
      }
    }
  }
}
