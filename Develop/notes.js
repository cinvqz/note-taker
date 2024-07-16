const express = require('express');
const fs = require('fs');
const path = require('path');

const notesRouter = express.Router();
const NOTES_FILE = path.join(__dirname, 'db/db.json');

// Helper function to read the notes from the JSON file
const readNotes = () => {
  try {
    const data = fs.readFileSync(NOTES_FILE, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error(err);
    return [];
  }
};

// Helper function to write notes to the JSON file
const writeNotes = (notes) => {
  try {
    fs.writeFileSync(NOTES_FILE, JSON.stringify(notes, null, 2));
  } catch (err) {
    console.error(err);
  }
};

// GET route for retrieving all notes
notesRouter.get('/notes', (req, res) => {
  const notes = readNotes();
  res.json(notes);
});

// POST route for adding a new note
notesRouter.post('/notes', (req, res) => {
  const notes = readNotes();
  const newNote = req.body;

  // Add a unique id to the new note
  newNote.id = Date.now().toString();
  notes.push(newNote);
  writeNotes(notes);

  res.json(newNote);
});

// DELETE route for deleting a note by id
notesRouter.delete('/notes/:id', (req, res) => {
  const notes = readNotes();
  const noteId = req.params.id;

  // Remove the note with the given id from the list of notes
  const updatedNotes = notes.filter(note => note.id !== noteId);
  writeNotes(updatedNotes);

  res.json({ success: true });
});

module.exports = { notesRouter };
