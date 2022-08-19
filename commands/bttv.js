module.exports = {
  alias: ['bttv', 'bettertwitchtv', 'ffz', 'frankerfacez'],
  async execute(client, channel) {
    client.say(
      channel,
      'blobDance pressF Konntest du die Emotes sehen? Wenn nicht, hast du die BetterTTV Erweiterung nicht installiert. Sie bietet einige zusätzliche Emotes und weitere coole Funktionen. https://betterttv.com/ (Nur für den Browser)',
    );
  },
};
