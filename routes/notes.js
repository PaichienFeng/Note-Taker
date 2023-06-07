const notesRouter = require('express').Router();
const { readAndAppend, readFromFile } = require('../helpers/fsUtils');
const fs= require('fs');


notesRouter.get('/api/notes', (req, res) =>
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
);


notesRouter.post('/api/notes', (req, res) => {
    const { title, text } = req.body;
  
    // If all the required properties are present
    if (title && text) {
      // Variable for the object we will save
      const newNotes = {
       title,
       text,
      };
  
      readAndAppend(newNotes, './db/db.json');
  
      const response = fs.readFileSync('./db/db.json', 'utf8');
      res.json(response);
    } else {
      res.json('Error in posting feedback');
    }
  });

module.exports=notesRouter