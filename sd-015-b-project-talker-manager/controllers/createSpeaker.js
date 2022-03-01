// const { write, writeFile } = require('fs');
const fs = require('fs/promises');

async function createSpeaker(req, res, next) {
  try {
    const { name, age, talk: { watchedAt, rate } } = req.body;
    const spekears = await fs.readFile('./talker.json', 'utf-8');
    const parserSpeaker = JSON.parse(spekears);
    const newId = parserSpeaker.length + 1;

    const newSpeaker = { id: newId, name, age, talk: { watchedAt, rate } };
    // const newData = [...parserSpeaker, newSpeaker];
    parserSpeaker.push(newSpeaker);

    const stringfiSpeakers = JSON.stringify(parserSpeaker, null, 2);

    await fs.writeFile('./talker.json', stringfiSpeakers);

    return res.status(201).json(newSpeaker);
  } catch (e) {
    return next(e);
  }
}

module.exports = createSpeaker;