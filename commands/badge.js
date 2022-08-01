module.exports = {
  alias: ['badge'],
  async execute(client, channel, args, tags, dbClient) {
    try {
      await dbClient.connect();
      const collection = dbClient.db('twitch').collection('users');
      const status = args[0];
      const { username, 'user-id': userId } = tags;

      if (!status) {
        client.say(channel, `@${username}, bitte gib eine Badge ID an.`);
        return;
      }

      await collection.updateOne(
        { _id: userId },
        { $set: { twitchId: userId, customBadge: status } },
      );

      client.say(channel, `@${username}, Custom Badge gesetzt!`);
    } catch (error) {
      client.say(
        channel,
        `@${tags.username}, Custom Badge konnte nicht gesetzt werden!`,
      );
      console.error(error.message);
    } finally {
      await dbClient.close();
    }
  },
};
