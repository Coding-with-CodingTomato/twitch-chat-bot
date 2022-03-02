module.exports = {
  alias: ['coin', 'münze'],
  async execute(client, channel, args, tags, dbClient) {
    const [result] = args;

    console.log(result);

    if (result !== undefined && (tags['user-type'] === 'mod' || tags.username === 'codingtomato')) {
      client.say(channel, `${result}!`);
      return;
    }

    const randomZahl = Math.random();

    if (randomZahl > 0.5) {
      client.say(channel, 'Kopf!');
    } else {
      client.say(channel, 'Zahl!');
    }
  },
};
