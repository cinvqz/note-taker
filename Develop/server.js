const express = require('express');
const path = require('path');
const { pageRouter } = require('./pages');
const { notesRouter } = require('./notes');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', pageRouter);
app.use('/api', notesRouter);

app.listen(PORT, () => {
  console.info(`Server started on http://localhost:${PORT}`);
});
