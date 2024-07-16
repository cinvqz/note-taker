const express = require('express');
const fs = require('fs');
const path = require('path');

const notesRouter = express.Router();
const NOTES_FILE = path.join(__dirname, 'db/db.json');

const readNotes = () => {
    try {
        const data = fs.readFileSync(NOTES_FILE, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error(err);
        return [];
    }
};

const writeNotes = (notes) => {
    try {
        fs.writeFileSync(NOTES_FILE, JSON.stringify(notes, null, 2));
    } catch (err) {
        console.error(err);
    }
};

notesRouter.get('/notes', (req, res) => {
    const notes = readNotes();
    res.json(notes);
});

notesRouter.post('/notes', (req, res) => {
    const notes = readNotes();
    const newNote = req.body;

    // id for note
    newNote.id = Date.now().toString();
    notes.push(newNote);
    writeNotes(notes);

    res.json(newNote);
});

// Delete route for deleting a note by id
notesRouter.delete('/notes/:id', (req, res) => {
    const notes = readNotes();
    const noteId = req.params.id;

    
    const updatedNotes = notes.filter(note => note.id !== noteId);
    writeNotes(updatedNotes);

    res.json({ success: true });
});

module.exports = { notesRouter };
