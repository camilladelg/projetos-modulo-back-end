const fs = require('fs/promises');

async function searchSpeaker(req, res, next) {
  try {
    const { q } = req.query;

    const speakers = await fs.readFile('./talker.json', 'utf-8');
    const parserSpeaker = JSON.parse(speakers);
    
    if (q === '' || !q) {
      return res.status(200).json(parserSpeaker);
    }

    const searchedSpeaker = parserSpeaker
      .filter((s) => s.name.toLowerCase().includes(q.toLowerCase()));
      
    return res.status(200).json(searchedSpeaker);
  } catch (e) {
    return next(e);
  }
}

module.exports = searchSpeaker;