const router = require('express').Router();
const notesRouter = require('./notes.js');
const path = require('path');

router.use(notesRouter);

router.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'))
);

router.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '..', 'public', 'notes.html'))
)

module.exports=router;