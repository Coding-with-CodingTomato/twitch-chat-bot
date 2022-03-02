module.exports = {
  alias: ['editor', 'vscode', 'ide'],
  async execute(client, channel) {
    client.say(channel, '🖊️ Editor meiner Wahl: Visual Studio Code (https://code.visualstudio.com/)');
  },
};
