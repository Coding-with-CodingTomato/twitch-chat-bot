const allUsers = new Map();

module.exports = {
  addUserToDB: async (dbClient, id, username, message) => {
    try {
      await dbClient.connect();
      const collection = dbClient.db('twitch').collection('users');

      await collection.insertOne(
        {
          _id: id,
          username,
          dcUserId: 0,
          customBadge: '',
          customStatus: '',
          created_at: Date.now(),
          updated_at: Date.now(),
          firstMessage: message,
        },
      );

      console.log(`Added ${username} (${id}) to DB`);
    } catch (error) {
      console.error(error.message);
    } finally {
      await dbClient.close();
    }
  },
  getDBUsers: async (dbClient) => {
    try {
      await dbClient.connect();
      const collection = dbClient.db('twitch').collection('users');
      const cursor = await collection.find({});
      await cursor.forEach((u) => {
        // eslint-disable-next-line no-underscore-dangle
        allUsers.set(u._id, u);
      });

      return allUsers;
    } catch (error) {
      console.error(error.message);
      return error.message;
    } finally {
      await dbClient.close();
    }
  },
};
