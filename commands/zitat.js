const { v4: uuidv4 } = require('uuid');

module.exports = {
  alias: ['zitat'],
  async execute(client, channel, args, tags, dbClient) {
    const [action, zitat] = args;
    if (!action || !zitat) { client.say(channel, '!zitat add|remove <zitat>'); return; }

    if (action === 'add') {
      try {
        await dbClient.connect();
        await dbClient.db('twitch').collection('chatBot_zitate').insertOne({ _id: uuidv4(), value: zitat.trim(), timestamp: Date.now() });
        client.say(channel, 'Neues Zitat gesetzt!');
        return;
      } catch (error) {
        console.error(error.message);
      } finally {
        await dbClient.close();
      }
    } else if (action === 'remove') {
      if (tags['user-type'] !== 'mod' && tags.username !== 'codingtomato') return;
      try {
        await dbClient.connect();
        const response = await dbClient.db('twitch').collection('chatBot_zitate').deleteOne({ _id: zitat });

        if (response.deletedCount === 0) {
          client.say(channel, 'Zitat nicht gefunden!');
        } else {
          client.say(channel, 'Zitat gelöscht!');
        }

        return;
      } catch (error) {
        console.error(error.message);
      } finally {
        await dbClient.close();
      }
    }
  },
};
