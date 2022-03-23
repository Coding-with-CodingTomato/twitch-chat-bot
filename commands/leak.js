module.exports = {
  alias: ['leak'],
  async execute(client, channel, args, tags, dbClient) {
    const counterId = 'leakCounter';

    try {
      await dbClient.connect();
      const collection = dbClient.db('twitch').collection('chatBot_vars');
      const counter = await collection.findOne({ _id: counterId });

      let newValue = 1;
      if (counter !== null) {
        newValue = counter.value + 1;
      }

      await collection.updateOne(
        { _id: counterId },
        { $set: { _id: counterId, value: newValue } },
        { upsert: true },
      );

      client.say(
        channel,
        `CodingTomato hat schon ${newValue} mal seinen Namen oder Token geleakt. LUL coding36Angry`,
      );
    } catch (error) {
      console.error(error.message);
    } finally {
      await dbClient.close();
    }
  },
};
