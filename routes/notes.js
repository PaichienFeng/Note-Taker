const notesRouter = require('express').Router();
const { readAndAppend, readFromFile } = require('../helpers/fsUtils');



notesRouter.get('/api/notes', (req, res) =>
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
);

module.exports=notesRouter