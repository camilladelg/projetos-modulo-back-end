const fs = require('fs/promises');

async function updateSpeaker(req, res, next) {
  try {
    const { id } = req.params;
    const { name, age, talk: { watchedAt, rate } } = req.body;

    const speakers = await fs.readFile('./talker.json', 'utf-8');
    const parserSpeakers = JSON.parse(speakers);

    const speakerIndex = parserSpeakers.findIndex((s) => s.id === Number(id));
    if (speakerIndex === -1) return res.status(401).json({ message: 'Palestrante não encontrado' });

    const speakerUpdate = { id: Number(id), name, age, talk: { watchedAt, rate } };
    parserSpeakers[speakerIndex] = speakerUpdate;

    const stringfiSpeakers = JSON.stringify(parserSpeakers, null, 2);
    await fs.writeFile('./talker.json', stringfiSpeakers);
    return res.status(200).json(speakerUpdate);
  } catch (e) { return next(e); }
}

module.exports = updateSpeaker;