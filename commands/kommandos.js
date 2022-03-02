module.exports = {
  alias: ['kommandos', 'kommando', 'commands', 'command', 'hilfe', 'help'],
  async execute(client, channel) {
    client.say(channel, '👀 Alle Kommandos: !github, !discord');
  },
};
