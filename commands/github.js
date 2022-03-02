module.exports = {
  alias: ['github', 'gh', 'repo'],
  async execute(client, channel, args, tags, dbClient) {
    try {
      await dbClient.connect();
      const githubRepo = await dbClient.db('twitch').collection('chatBot_vars').findOne({ _id: 'currentGithubRepo' });

      if (githubRepo.value) {
        client.say(
          channel,
          `🪐 Das aktuelle Repository: ${githubRepo.value} ➡️
        Alle Repositories aus dem Stream: https://github.com/Coding-with-CodingTomato`,
        );
      } else {
        client.say(channel, '🪐 Hier findest du alle Repositories aus dem Stream: https://github.com/Coding-with-CodingTomato');
      }
    } catch (error) {
      console.error(error.message);
    } finally {
      await dbClient.close();
    }
  },
};
