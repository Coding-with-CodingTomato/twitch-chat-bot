module.exports = {
  alias: ['kommandos', 'kommando', 'commands', 'command', 'hilfe', 'help'],
  async execute(client, channel) {
    client.say(channel, '👀 Alle Kommandos: !github, !discord, !magischemiesmuschel {frage}, !coin, !editor, !lurk, !musik, !theme, !zitat add {zitat}, !zitate, !zitate all, !würfel, !würfel #größe, !bttv, !overlay, !prime, !emote');
  },
};
