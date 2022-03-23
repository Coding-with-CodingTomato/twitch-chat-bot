module.exports = {
  alias: ['discord-id', 'dc-id'],
  async execute(client, channel, args, tags, dbClient) {
    try {
      await dbClient.connect();
      const collection = dbClient.db('twitch').collection('users');
      const discordId = args[0];

      if (!discordId) {
        client.say(channel, 'Bitte gib deine Discord User ID an!');
        return;
      }

      await collection.updateOne({ _id: tags['user-id'] }, { $set: { _id: tags['user-id'], dcUserId: discordId } });

      client.say(channel, `@${tags.username}, Discord User ID gesetzt!`);
    } catch (error) {
      client.say(channel, `@${tags.username}, Discord User ID konnte nicht gesetzt werden!`);
      console.error(error.message);
    } finally {
      await dbClient.close();
    }
  },
};
