const fs = require('fs/promises');

async function deleteSpeaker(req, res, next) {
  try {
    const { id } = req.params;

    const speakers = await fs.readFile('./talker.json', 'utf-8');
    const parserSpeakers = JSON.parse(speakers);

    const newArrSpeakers = parserSpeakers.filter((s) => s.id !== Number(id));
    
    const stringfiSpeakers = JSON.stringify(newArrSpeakers, null, 2);
    await fs.writeFile('./talker.json', stringfiSpeakers);

    return res.status(204).end();
  } catch (e) { return next(e); }
}

module.exports = deleteSpeaker;