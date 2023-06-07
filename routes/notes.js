const notesRouter = require('express').Router();
const { readAndAppend, readFromFile } = require('../helpers/fsUtils');
const fs= require('fs');
const { v4: uuidv4 } = require('uuid');



notesRouter.get('/api/notes', (req, res) =>
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
);


notesRouter.post('/api/notes', (req, res) => {
    const { title, text} = req.body;
  
    if (title && text) {
      const newNotes = {
       title,
       text,
       id: uuidv4(),
      };
  
      readAndAppend(newNotes, './db/db.json');
  
      const response = fs.readFileSync('./db/db.json', 'utf8');
      res.json(response);
    } else {
      res.json('Error in posting feedback');
    }
  });

  notesRouter.delete('/api/notes/:id',(req, res)=>{
    const noteID=req.params.id;
    let allNotes = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));
    for (let i = 0; i < allNotes.length; i++) {
        if (noteID === allNotes[i].id) {
          allNotes.splice(i, 1)
          fs.writeFileSync('./db/db.json', JSON.stringify(allNotes));
        }
      }
    
  })

module.exports=notesRouter