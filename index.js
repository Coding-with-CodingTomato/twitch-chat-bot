const fs = require('fs');
const tmi = require('tmi.js');
require('dotenv').config();
const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017';
const dbClient = new MongoClient(url);

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

client.connect();

client.on('message', async (channel, tags, message, self) => {
  if (self || !message.startsWith('!')) return;

  const args = message.slice(1).split(' ');
  const command = args.shift().toLowerCase();

  if (commandsMap.has(command)) {
    const commandFunction = commandsMap.get(command);
    commandFunction(client, channel, args, tags, dbClient);
  }
});
