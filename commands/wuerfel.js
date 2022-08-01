module.exports = {
  alias: ['wuerfel', 'dice', 'würfel'],
  async execute(client, channel, args, tags, dbClient) {
    const [count] = args;
    let value = 6;

    const rollDice = (size) => Math.round(Math.random() * (size - 1) + 1);

    if (count !== undefined && count.match(/(\d*)W(\d*)([+|-]\d+)?/)) {
      const array = count.match(/(\d*)W(\d*)([+|-]\d+)?/);
      // eslint-disable-next-line max-len
      const calc =
        parseInt(array[1] || 1, 10) * rollDice(parseInt(array[2] || 1, 10)) +
        parseInt(array[3] || 0, 10);

      client.say(channel, `Tabletop Würfel: ${calc}`);
      return;
    }

    if (count !== undefined) {
      // eslint-disable-next-line no-eval
      const calculatedNumber = eval(count.replace(/[^-()\d/*+.]/g, ''));
      value = parseInt(calculatedNumber, 10);

      client.say(channel, `Custom Würfel: ${rollDice(value)}`);
      return;
    }

    client.say(channel, `Normaler Würfel: ${rollDice(value)}`);
  },
};
