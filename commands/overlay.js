module.exports = {
  alias: ['overlay', 'chat', 'chatoverlay'],
  async execute(client, channel) {
    client.say(
      channel,
      'Ihr könnt eure Nachrichten mit Hilfe meines Chat Overlays detaillierter gestallten. ➡️ Zum Beispiel könnt ihr eure Nachrichten <i>kursiv</i> oder <b>fett</b> schreiben. Weitere Informationen im Info Bereich. coding36Nice',
    );
  },
};
