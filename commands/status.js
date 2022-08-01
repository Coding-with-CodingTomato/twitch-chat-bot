module.exports = {
  alias: ['status'],
  async execute(client, channel, args, tags, dbClient) {
    try {
      await dbClient.connect();
      const collection = dbClient.db('twitch').collection('users');
      const status = args.join(' ');
      const { username, 'user-id': userId } = tags;

      if (!status) {
        client.say(channel, `@${username}, bitte gib einen Status an.`);
        return;
      }

      await collection.updateOne(
        { twitchId: userId },
        { $set: { customStatus: status } },
      );

      client.say(channel, `@${username}, Status gesetzt!`);
    } catch (error) {
      client.say(
        channel,
        `@${tags.username}, Status konnte nicht gesetzt werden!`,
      );
      console.error(error.message);
    } finally {
      await dbClient.close();
    }
  },
};
