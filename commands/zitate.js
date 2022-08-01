module.exports = {
  alias: ['zitate'],
  async execute(client, channel, args, tags, dbClient) {
    const [action, ...restArr] = args;
    const rest = restArr.join(' ');

    try {
      await dbClient.connect();
      const zitate = await dbClient
        .db('twitch')
        .collection('chatBot_zitate')
        .find({})
        .toArray();

      if (action === undefined || action === 'random') {
        const randomZitat = zitate[Math.round(Math.random() * zitate.length)];

        client.say(
          channel,
          `"${randomZitat.value}" - am ${new Date(
            randomZitat.timestamp,
          ).toLocaleDateString('de')}`,
        );
      } else if (action === 'id') {
        // Alle Zitate mit IDs
        if (tags['user-type'] !== 'mod' && tags.username !== 'codingtomato')
          return;
        if (!zitate.length) return;

        let message = 'Alle bisherigen Zitate';
        zitate.forEach((z, i) => {
          message += ` ➡️ "${z.value}" - am ${new Date(
            z.timestamp,
          ).toLocaleDateString('de')} - ID: ${i}`;
        });

        client.say(channel, message);
      } else if (action === 'all') {
        // Alle Zitate ohne Ids
        let message = 'Alle bisherigen Zitate';
        zitate.forEach((z) => {
          message += ` ➡️ "${z.value}" - am ${new Date(
            z.timestamp,
          ).toLocaleDateString('de')}`;
        });

        client.say(channel, message);
      } else if (action === 'add') {
        if (tags['user-type'] !== 'mod' && tags.username !== 'codingtomato')
          return;

        try {
          await dbClient.connect();
          await dbClient.db('twitch').collection('chatBot_zitate').insertOne({
            value: rest.trim(),
            timestamp: Date.now(),
          });
          client.say(channel, 'Neues Zitat gesetzt!');
          return;
        } catch (error) {
          console.error(error.message);
        } finally {
          await dbClient.close();
        }
      } else if (action === 'remove') {
        if (tags['user-type'] !== 'mod' && tags.username !== 'codingtomato')
          return;

        try {
          const response = await dbClient
            .db('twitch')
            .collection('chatBot_zitate')
            .deleteOne({ _id: zitate[Number(rest)]._id });

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
      } else {
        let message = '';
        zitate.forEach((z, i) => {
          if (i === Number(action)) {
            message += ` ➡️ "${z.value}" - am ${new Date(
              z.timestamp,
            ).toLocaleDateString('de')}`;
          }
        });

        if (message) {
          client.say(channel, message);
        } else {
          client.say(channel, 'Zitat nicht gefunden!');
        }
      }
    } catch (error) {
      console.error(error.message);
    } finally {
      await dbClient.close();
    }
  },
};
