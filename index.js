const tmi = require('tmi.js');
const axios = require('axios');
require('dotenv').config();

const client = new tmi.Client({
  options: { debug: false },
  identity: {
    username: process.env.BOT_USERNAME,
    password: process.env.OAUTH_TOKEN,
  },
  channels: ['codingtomato'],
});

client.connect();

// Gobale Daten
let githupRepo = '';
const apiBaseURL = 'https://api.twitch.tv/helix';

client.on('message', async (channel, tags, message, self) => {
  if (self || !message.startsWith('!')) return;

  const args = message.slice(1).split(' ');
  const command = args.shift().toLowerCase();

  // Aktuelles Repository setzen
  if (command === 'set-repo') {
    if (tags['user-type'] !== 'mod' && tags.username !== 'codingtomato') return;

    const [newRepoLink] = args;
    githupRepo = newRepoLink;

    client.say(channel, 'Github Repo gesetzt!');
  }

  // Github Kommando
  if (command === 'github' || command === 'gh') {
    if (githupRepo) {
      client.say(
        channel,
        `🪐 Das aktuelle Repository: ${githupRepo} ➡️ 
        Alle Repositories aus dem Stream: https://github.com/Coding-with-CodingTomato`,
      );
    } else {
      client.say(channel, '🪐 Hier findest du alle Repositories aus dem Stream: https://github.com/Coding-with-CodingTomato');
    }
  }

  // Discord Kommando
  if (command === 'discord' || command === 'dc') {
    client.say(channel, '☎️ Schaut auch auf unserem Discord vorbei: https://discord.gg/Qs7sSq25JU');
  }

  // Alle Kommandos
  if (command === 'kommandos' || command === 'help') {
    client.say(channel, '👀 Alle Kommandos: !github, !discord');
  }

  // Shout-Out Kommando
  if (command === 'shoutout' || command === 'so') {
    if (tags['user-type'] !== 'mod' && tags.username !== 'codingtomato') return;

    try {
      const [username] = args;

      const userURL = `${apiBaseURL}/users?login=${username}`;
      const headers = { headers: { 'Client-Id': process.env.TWITCH_CLIENT_ID, Authorization: `Bearer ${process.env.API_OAUTH_TOKEN}` } };

      const responseUser = await axios.get(userURL, headers);
      const userId = responseUser.data.data[0]?.id;
      if (!userId) return;

      const channelURL = `${apiBaseURL}/channels?broadcaster_id=${userId}`;
      const responseChannel = await axios.get(channelURL, headers);
      const title = responseChannel.data.data[0]?.title;
      const game = responseChannel.data.data[0]?.game_name;

      client.say(channel, `🍅 Schaut doch mal bei https://twitch.tv/${username} vorbei. Sein letztes Game: ${game} ➡️ Letzter Titel: ${title}`);
    } catch (error) {
      console.error(error);
    }
  }
});
