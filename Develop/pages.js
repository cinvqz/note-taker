const pageRouter = require('express').Router();
const path = require('path');

pageRouter.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

module.exports = { pageRouter };