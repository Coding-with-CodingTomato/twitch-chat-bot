const axios = require('axios');

module.exports = {
  alias: ['follow-age', 'followage'],
  async execute(client, channel, args, tags, dbClient) {
    try {
      const response = await axios.get('https://api.codingtomato.de/api/v1/follower/');
      const json = response.data;

      const index = json.data.findIndex((u) => u.from_id === tags['user-id']);

      if (index === -1) {
        client.say(channel, `@${tags.username}, dein Follow wurde nicht gefunden! coding36Angry Aber du darfst gerne ein Follow da lassen.`);
        return;
      }

      const user = json.data[index];
      const date1 = new Date(user.followed_at);
      const date2 = new Date(Date.now());

      let diff = date2.getTime() - date1.getTime();

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      diff -= days * (1000 * 60 * 60 * 24);
      const hours = Math.floor(diff / (1000 * 60 * 60));
      diff -= hours * (1000 * 60 * 60);
      const mins = Math.floor(diff / (1000 * 60));
      diff -= mins * (1000 * 60);
      const seconds = Math.floor(diff / (1000));
      diff -= seconds * (1000);

      client.say(channel, `@${tags.username}, du folgst schon seit ${days} Tagen, ${hours} Stunden, ${mins} Minuten und ${seconds} Sekunden! Danke coding36Burning`);
    } catch (error) {
      client.say(channel, `@${tags.username}, dein Follow Age konnte nicht ermittelt werden!`);
      console.error(error.message);
      return;
    } finally {
      await dbClient.close();
    }
  },
};
