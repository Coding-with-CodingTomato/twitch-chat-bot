module.exports = {
  alias: ['badge'],
  async execute(client, channel, args, tags, dbClient) {
    try {
      await dbClient.connect();
      const collection = dbClient.db('twitch').collection('users');
      const status = args[0];

      if (!status) {
        client.say(channel, `@${tags.username}, bitte gib eine Badge ID an.`);
        return;
      }

      await collection.updateOne({ _id: tags['user-id'] }, { $set: { _id: tags['user-id'], customStatus: status } });

      client.say(channel, `@${tags.username}, Custom Badge gesetzt!`);
    } catch (error) {
      client.say(channel, `@${tags.username}, Custom Badge konnte nicht gesetzt werden!`);
      console.error(error.message);
    } finally {
      await dbClient.close();
    }
  },
};
