const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

notes.get('/', (req, res) => {
    res.json(JSON.parse(fs.readFileSync('./db/db.json')));
});

notes.post('/', (req, res) => {
    const { title, text } = req.body;

    if (title && text) {
        const addNote = {
            id: uuidv4(),
            title,
            text
        };
        const noteList = JSON.parse(fs.readFileSync('./db/db.json'));
        noteList.push(addNote);
        fs.writeFileSync('./db/db.json', JSON.stringify(noteList));
        res.json()
    }
});

module.exports = notes;