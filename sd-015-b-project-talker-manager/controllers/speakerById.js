const fs = require('fs/promises');

async function speakerById(req, res, next) {
  try {
    const { id } = req.params;

    const speakers = await fs.readFile('./talker.json', 'utf-8');
    const parserSpeakers = JSON.parse(speakers);

    const speaker = parserSpeakers.find((s) => s.id === Number(id));

    if (!speaker) {
      return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    }

    return res.status(200).json(speaker);
  } catch (e) {
    return next(e);
  }
}

module.exports = speakerById;