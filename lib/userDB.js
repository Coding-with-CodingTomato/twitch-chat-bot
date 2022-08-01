const { MongoClient } = require('mongodb');

const url = process.env.MONGO_CONNECTION_URL;
const dbClient = new MongoClient(url);
const allUsers = new Map();

module.exports = {
  addUserToDB: async (id, username, message) => {
    try {
      await dbClient.connect();
      const collection = dbClient.db('twitch').collection('users');

      await collection.insertOne({
        twitchId: id,
        username,
        dcUserId: 0,
        customBadge: '',
        customStatus: '',
        created_at: Date.now(),
        updated_at: Date.now(),
        firstMessage: message,
      });

      console.log(`Added ${username} (${id}) to DB`);
    } catch (error) {
      console.error(error.message);
    } finally {
      await dbClient.close();
    }
  },
  getDBUsers: async () => {
    try {
      await dbClient.connect();
      const collection = dbClient.db('twitch').collection('users');
      const cursor = await collection.find({});
      await cursor.forEach((u) => {
        // eslint-disable-next-line no-underscore-dangle
        allUsers.set(u.twitchId, u);
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
