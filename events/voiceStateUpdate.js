class voiceStateUpdate {
    constructor(client) {
        this.name = 'voiceStateUpdate';
        this.client = client;
    }
}

async run (client) {
    client.on('voiceStateUpdate', (oldState, newState) => {
        if (newState.channel.name === 'Auto Meet') {
          newState.guild.channel.create("New Channel", {
            type: 'voice',
            parent: 'CATEGORY_ID'
          }).then(am => {
            newState.setChannel(am)
          })
        })
    })
}