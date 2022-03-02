module.exports = {
  alias: ['set-repo'],
  async execute(client, channel, args, tags, dbClient) {
    if (tags['user-type'] !== 'mod' && tags.username !== 'codingtomato') return;

    const [newRepoLink] = args;

    try {
      await dbClient.connect();
      await dbClient.db('twitch').collection('chatBot_vars').updateOne({ _id: 'currentGithubRepo' }, { $set: { _id: 'currentGithubRepo', value: newRepoLink } }, { upsert: true });
    } catch (error) {
      console.error(error.message);
    } finally {
      await dbClient.close();
    }

    client.say(channel, 'Github Repo gesetzt!');
  },
};
