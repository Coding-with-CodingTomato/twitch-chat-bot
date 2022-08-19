const { getAllCustomCommands } = require('../lib/customCommands');

module.exports = {
  alias: ['kommandos', 'kommando', 'commands', 'command', 'hilfe', 'help'],
  async execute(client, channel) {
    const allCustomCommands = await getAllCustomCommands();
    const allCustomCommandsString = allCustomCommands.reduce(
      (newString, c) => `${newString} !${c.name}, `,
      '',
    );

    client.say(
      channel,
      `👀 Alle Kommandos (https://codingtomato.de/#/commands): !github, !discord, !magischemiesmuschel {frage}, !coin, !editor, !lurk, !leak, !musik, !theme, !zitate random, !zitate all, !zitate {id}, !würfel, !würfel {größe}, !bttv, !overlay, !prime, !emote, !discord-id {discord user id}, !status {nachricht}, !badge {badge id}, !follow-age, ${allCustomCommandsString}`,
    );
  },
};
