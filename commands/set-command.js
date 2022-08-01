const { newCommandGenerated } = require('../lib/customCommands');

module.exports = {
  alias: ['set-command'],
  async execute(client, channel, args, tags, dbClient) {
    if (tags['user-type'] !== 'mod' && tags.username !== 'codingtomato') return;

    const [command, ...responseArr] = args;
    const response = responseArr.join(' ');

    try {
      await dbClient.connect();
      await dbClient
        .db('twitch')
        .collection('commands')
        .updateOne(
          { name: command },
          { $set: { name: command.toLowerCase(), response } },
          { upsert: true },
        );
      newCommandGenerated();
    } catch (error) {
      console.error(error.message);
    } finally {
      await dbClient.close();
    }

    client.say(channel, 'Kommando gesetzt!');
  },
};
