const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
const fs = require('fs');
const path = require('path');
const { nanoid } = require('nanoid');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

const notes = require('./db/db.json');

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.get('/api/notes', (req, res) => {
    res.json(notes);
});


app.post('/api/notes', (req, res) => {
    let jsonFile = path.join(__dirname, 'db/db.json');
    let newNote = req.body;
    newNote.id = nanoid();

    notes.push(newNote);

    fs.writeFile(jsonFile, JSON.stringify(notes), (err) => {
        if (err) {
            throw err;
        }
    });
    res.json(newNote);
});

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});