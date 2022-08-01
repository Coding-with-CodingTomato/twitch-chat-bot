const fs = require('fs');
const tmi = require('tmi.js');
require('dotenv').config();
const { MongoClient } = require('mongodb');
const { getDBUsers, addUserToDB } = require('./lib/userDB');
const {
  getAllCustomCommands,
  newCommandGenerated,
} = require('./lib/customCommands');

const url = process.env.MONGO_CONNECTION_URL;
const dbClient = new MongoClient(url);
let allUsers;

const getAllUsers = async () => {
  allUsers = await getDBUsers();
};
const addOneUser = async (userId, username, message) => {
  if (!allUsers.has(userId)) {
    await addUserToDB(userId, username, message);
    getAllUsers();
  }
};

/**
 * Command Management
 */
const commandsMap = new Map();
const commandFiles = fs
  .readdirSync('./commands')
  .filter((f) => f.endsWith('.js'));
const setFileCommands = async () => {
  commandFiles.forEach((file) => {
    const command = require(`./commands/${file}`);

    command.alias.forEach((alias) => {
      commandsMap.set(alias, command.execute);
    });
  });
};
const setCustomCommands = async () => {
  const customCommands = await getAllCustomCommands();

  customCommands.forEach((c) => {
    commandsMap.set(c.name, async (client, channel) => {
      const ctEmojis = [
        'coding36burn',
        'coding36Tomate',
        'coding36Ketchup',
        'coding36Bruschetta',
        'coding36Nice',
        'coding36Close',
        'coding36Smart',
        'coding36Angry',
        'coding36Money',
      ];
      const response = c.response
        .replace('%now', new Date(Date.now()).toLocaleString())
        .replace('%time', new Date(Date.now()).toLocaleTimeString())
        .replace('%date', new Date(Date.now()).toLocaleDateString())
        .replace(
          '%ranEmoji',
          ctEmojis[Math.floor(Math.random() * ctEmojis.length)],
        );

      client.say(channel, response);
    });
  });
};
const setCommands = async () => {
  commandsMap.clear();
  await setFileCommands();
  await setCustomCommands();
};
setCommands();

// Refresh Commands when custom commands got refreshed
newCommandGenerated(() => {
  setCommands();
});

/**
 * TMI Stuff
 */

const client = new tmi.Client({
  options: { debug: false },
  identity: {
    username: process.env.BOT_USERNAME,
    password: process.env.OAUTH_TOKEN,
  },
  channels: ['codingtomato'],
});

client.on('message', async (channel, tags, message, self) => {
  const { username, 'user-id': userId } = tags;

  if (!self) addOneUser(userId, username, message);
  if (self || !message.startsWith('!')) return;

  const args = message.slice(1).split(' ');
  const command = args.shift().toLowerCase();

  if (commandsMap.has(command)) {
    const commandFunction = commandsMap.get(command);
    console.log(commandFunction);
    commandFunction(client, channel, args, tags, dbClient);
  }
});

getAllUsers();
client.connect();
