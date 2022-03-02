module.exports = {
  alias: ['8ball', 'magischemiesmuschel', 'magische-miesmuschel'],
  async execute(client, channel, args, tags, dbClient) {
    const [message] = args;

    if (message === undefined) {
      client.say(channel, 'Du hast der magischen Miesmuschel keine Frage gestellt!');
      return;
    }
    const answers = ['Ist doch klar.', 'Das ist eindeutig so.', 'Zweifellos.', 'Ja, auf jeden Fall.', 'Sie können sich darauf verlassen.', 'Meiner Meinung nach, ja.', 'Höchstwahrscheinlich.', 'Gute Aussichten.', 'Ja', 'Die Anzeichen deuten auf ein Ja hin.', 'Ist nicht ganz klar, versuchen Sie es erneut.', 'Frag mich später nochmal.', 'Ich sage es dir besser nicht.', 'Kann ich jetzt nicht vorhersagen.', 'Konzentriere dich und frag erneut.', 'Verlass dich nicht darauf.', 'Meine Antwort lautet nein.', 'Meine Quellen sagen nein.', 'Der Ausblick ist nicht so gut.', 'Sehr fraglich.'];
    const answer = answers[Math.round(Math.random() * answers.length)];

    client.say(channel, `Die magische Miesmuschel sagt: ${answer}`);
  },
};
