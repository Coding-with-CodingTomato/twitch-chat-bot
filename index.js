const fs = require('fs');
const tmi = require('tmi.js');
require('dotenv').config();
const { MongoClient } = require('mongodb');
const { getDBUsers, addUserToDB } = require('./lib/userDB');

const url = process.env.MONGO_CONNECTION_URL;
const dbClient = new MongoClient(url);
let allUsers;

const getAllUsers = async () => {
  allUsers = await getDBUsers(dbClient);
};
const addOneUser = async (userId, username, message) => {
  if (!allUsers.has(userId)) {
    await addUserToDB(dbClient, userId, username, message);
    getAllUsers();
  }
};

/**
 * Command Management
 */
const commandsMap = new Map();
const commandFiles = fs.readdirSync('./commands').filter((f) => f.endsWith('.js'));
commandFiles.forEach((file) => {
  const command = require(`./commands/${file}`);

  command.alias.forEach((alias) => {
    commandsMap.set(alias, command.execute);
  });
});

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
  addOneUser(userId, username, message);

  if (self || !message.startsWith('!')) return;

  const args = message.slice(1).split(' ');
  const command = args.shift().toLowerCase();

  if (commandsMap.has(command)) {
    const commandFunction = commandsMap.get(command);
    commandFunction(client, channel, args, tags, dbClient);
  }
});

getAllUsers();
client.connect();
