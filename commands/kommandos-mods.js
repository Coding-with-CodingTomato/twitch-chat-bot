const { getAllCustomCommands } = require('../lib/customCommands');

module.exports = {
  alias: [
    'kommandos-mods',
    'kommando-mods',
    'commands-mods',
    'command-mods',
    'hilfe-mods',
    'help-mods',
  ],
  async execute(client, channel, args, tags) {
    if (tags['user-type'] !== 'mod' && tags.username !== 'codingtomato') return;

    client.say(
      channel,
      '👀 Alle Mod-Kommandos (https://codingtomato.de/commands): !zitate add {zitat}, !zitate remove {id}, !zitate id, !set-command {name} {response}, !delete-command {name}, !set-repo {url}, !shoutout {username}',
    );
  },
};
