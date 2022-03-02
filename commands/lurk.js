module.exports = {
  alias: ['lurk'],
  async execute(client, channel, args, tags, dbClient) {
    try {
      await dbClient.connect();
      const collection = dbClient.db('twitch').collection('chatBot_vars');
      const lurkCounter = await collection.findOne({ _id: 'lurkCounter' });

      let newValue = 1;
      if (lurkCounter !== null) {
        newValue = lurkCounter.value + 1;
      }

      await collection.updateOne({ _id: 'lurkCounter' }, { $set: { _id: 'lurkCounter', value: newValue } }, { upsert: true });

      client.say(channel, `Es sind bereits ${newValue} Zuschauer in den Lurk gegangen. Danke! 🍅💚`);
    } catch (error) {
      console.error(error.message);
    } finally {
      await dbClient.close();
    }
  },
};
