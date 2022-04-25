const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
const fs = require('fs');
const path = require('path');
// node package that generates random ID
const { nanoid } = require('nanoid');

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

const notes = require('./db/db.json');

// route that 
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});

// route that populates the page with notes notes from the db
app.get('/api/notes', (req, res) => {
    res.json(notes);
});

// routes to the landing page if the url is anything but api/notes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

// route to create new note
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

// app.delete('api/notes/:id', (req, res) => {
//     const requestID = req.params.id;
//     let targetInd;
    
//     fs.readFile('db/db.json', (err, data) => {
//         if (err) throw err;
//         let notesData = JSON.parse(data);
    
//         let targetNote = notesData.filter((note) => {
//         return note.id === requestID;
//         })[0];
    
//         notes.forEach((item, index) => {
//         if(item.id === targetNote.id) {
//             targetInd = index;
//         }
//         });
    
//         notes.splice(target, 1);
    
//         newData = JSON.stringify(notes);
    
//         fs.writeFile('db/db.json', newData, (err) => {
//         if (err) throw err;
//         });
//         res.json(notes);
//     });
// });

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});