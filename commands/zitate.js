module.exports = {
  alias: ['zitate'],
  async execute(client, channel, args, tags, dbClient) {
    const [action] = args;

    try {
      await dbClient.connect();
      const zitate = await dbClient.db('twitch').collection('chatBot_zitate').find({}).toArray();

      if (action === undefined || action === 'random') {
        const randomZitat = zitate[Math.round(Math.random() * zitate.length)];
        client.say(channel, `"${randomZitat.value}" - CodingTomato am ${new Date(randomZitat.timestamp).toLocaleDateString('de')}`);
      } else if (action === 'id') {
        // Alle Zitate mit IDs
        if (tags['user-type'] !== 'mod' && tags.username !== 'codingtomato') return;

        let message = 'Alle bisherigen Zitate';
        zitate.forEach((z) => {
          message += ` ➡️ "${z.value}" - CodingTomato am ${new Date(z.timestamp).toLocaleDateString('de')} - ID: ${z._id}`;
        });

        client.say(channel, message);
      } else if (action === 'all') {
        // Alle Zitate ohne Ids
        let message = 'Alle bisherigen Zitate';
        zitate.forEach((z) => {
          message += ` ➡️ "${z.value}" - CodingTomato am ${new Date(z.timestamp).toLocaleDateString('de')}`;
        });

        client.say(channel, message);
      }
    } catch (error) {
      console.error(error.message);
    } finally {
      await dbClient.close();
    }
  },
};
