const path = require('path');
const fs = require('fs')
const router = require('express').Router();

// GET /api/notes
router.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './db/db.json'));
});

// POST /api/notes, This will post notes to the db.json file
router.post('/notes', (req, res) => {
  let db = fs.readFileSync('./db/db.json');
  db = JSON.parse(db);
  const userNote = {
    title: req.body.title,
    text: req.body.text,
    // creating unique id for each note
    id: Math.floor(Math.random() * 1000), 
  };
  db.push(userNote);
  fs.writeFileSync('./db/db.json', JSON.stringify(db));
  res.json(userNote);

});

router.delete('/notes/:id', (req, res) => {
  // reading notes from db.json
  const db = JSON.parse(fs.readFileSync('./db/db.json'));
  const id = parseInt(req.params.id);
  const index = db.findIndex(item => item.id === id);
  db.splice(index, 1);
  // rewrite updated db array to db.json
  fs.writeFileSync('./db/db.json', JSON.stringify(db));

  res.json(db);
});

module.exports = router;


