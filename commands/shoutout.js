const axios = require('axios');
const config = require('../config');

module.exports = {
  alias: ['so', 'shoutout', 'shout-out'],
  async execute(client, channel, args, tags) {
    if (tags['user-type'] !== 'mod' && tags.username !== 'codingtomato') return;

    try {
      const [username] = args;

      const userURL = `${config.twitchApiBaseURL}/users?login=${username}`;
      const headers = { headers: { 'Client-Id': process.env.TWITCH_CLIENT_ID, Authorization: `Bearer ${process.env.API_OAUTH_TOKEN}` } };

      const responseUser = await axios.get(userURL, headers);
      const userId = responseUser.data.data[0]?.id;
      if (!userId) return;

      const channelURL = `${config.twitchApiBaseURL}/channels?broadcaster_id=${userId}`;
      const responseChannel = await axios.get(channelURL, headers);
      const title = responseChannel.data.data[0]?.title;
      const game = responseChannel.data.data[0]?.game_name;

      client.say(channel, `🍅 Schaut doch mal bei https://twitch.tv/${username} vorbei. Sein letztes Game: ${game} ➡️ Letzter Titel: ${title}`);
    } catch (error) {
      console.error(error.message);
    }
  },
};
