const fs = require('fs/promises');

async function listSpeakers(req, res, next) {
  try {
    const speakers = await fs.readFile('./talker.json', 'utf-8');

    const parserSpeaker = JSON.parse(speakers);

    return res.status(200).json(parserSpeaker);
  } catch (e) {
    return next(e);
  }
}

module.exports = listSpeakers;