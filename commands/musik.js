module.exports = {
  alias: ['musik', 'music', 'song', 'lied'],
  async execute(client, channel) {
    client.say(
      channel,
      '🎶 Aktuell spielt: https://open.spotify.com/playlist/7sZbq8QGyMnhKPcLJvCUFD?si=ea6452764936449b',
    );
  },
};
