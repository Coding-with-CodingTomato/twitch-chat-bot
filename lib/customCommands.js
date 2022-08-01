const { MongoClient } = require('mongodb');

const url = process.env.MONGO_CONNECTION_URL;
const dbClient = new MongoClient(url);

let newCommandCB;

const newCommandGenerated = (cb) => {
  if (cb) {
    newCommandCB = cb;
  } else {
    newCommandCB();
  }
};

const getAllCustomCommands = async () => {
  try {
    await dbClient.connect();
    const col = dbClient.db('twitch').collection('commands');

    const allCommands = await col.find({}).toArray();
    return allCommands;
  } catch (error) {
    console.error(error);
  } finally {
    await dbClient.close();
  }
};

const addNewCommand = async (name, response) => {
  try {
    await dbClient.connect();
    const col = dbClient.db('twitch').collection('commands');

    await col.insertOne({
      name,
      response,
    });
  } catch (error) {
    console.error(error);
  } finally {
    await dbClient.close();
  }
};

module.exports = { addNewCommand, getAllCustomCommands, newCommandGenerated };
