const { newCommandGenerated } = require('../lib/customCommands');

module.exports = {
  alias: ['delete-command'],
  async execute(client, channel, args, tags, dbClient) {
    if (tags['user-type'] !== 'mod' && tags.username !== 'codingtomato') return;

    const [command] = args;

    try {
      await dbClient.connect();
      await dbClient
        .db('twitch')
        .collection('commands')
        .findOneAndDelete({ name: command });
      newCommandGenerated();
    } catch (error) {
      console.error(error.message);
    } finally {
      await dbClient.close();
    }

    client.say(channel, 'Kommando gelöscht!');
  },
};
