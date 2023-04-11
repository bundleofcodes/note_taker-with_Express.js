const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const allNotes = require('/Users/cmitchell/bootcamp/GT-VIRT-FSF-PT-01-2023-U-LOLC/note_taker-with_Express.js/db/db.json');
const { text } = require('express');
const { title } = require('process');
const shortid = require('shortid');


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.get('/api/notes', (req, res) => {
    fs.readFile('/Users/cmitchell/bootcamp/GT-VIRT-FSF-PT-01-2023-U-LOLC/note_taker-with_Express.js/db/db.json', (err, data) => {
        const allData = JSON.parse(data)
    res.json(allData.slice());
    });
});


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

// function createNewNote(body, notesArray) {
//     const newNote = {
//         title: title.body,
//         text: text.body,
//         id: shortid.generate()
//     };
//     // if (!Array.isArray(notesArray))
//     //     notesArray = [];

//     // if (notesArray.length === 0)
//     //     notesArray.push(0);

//     // body.id = notesArray[0];
//     // notesArray[0]++;

//     notesArray.push(newNote);
//     fs.writeFileSync(
//         path.join(__dirname, './db/db.json'),
//         JSON.stringify(notesArray, null, 2)
//     );
//     return newNote;
// }
//Help from Pham
app.post('/api/notes', (req, res) => {
    const { title, text } = req.body;
    const id = shortid.generate()
    fs.readFile('/Users/cmitchell/bootcamp/GT-VIRT-FSF-PT-01-2023-U-LOLC/note_taker-with_Express.js/db/db.json', (err, data) => {
        const allData = JSON.parse(data)
        const newData = {
            title,
            text,
            id
        }
        allData.push(newData)
        fs.writeFile('/Users/cmitchell/bootcamp/GT-VIRT-FSF-PT-01-2023-U-LOLC/note_taker-with_Express.js/db/db.json', JSON.stringify(allData,null,2), (err) => {
            if (err)throw err;
            res.send("200"); 
            // console.log(err)
        })
        })
        // const newNote = createNewNote(req.body, allNotes);
    });
    //Help ended from Pham
    // const newNote = createNewNote(req.body, allNotes);
    // res.json(newNote);

function deleteNote(id, notesArray) {
    for (let i = 0; i < notesArray.length; i++) {
        let note = notesArray[i];

        if (note.id == id) {
            notesArray.splice(i, 1);
            fs.writeFileSync(
                path.join(__dirname, '/Users/cmitchell/bootcamp/GT-VIRT-FSF-PT-01-2023-U-LOLC/note_taker-with_Express.js/db/db.json'),
                JSON.stringify(notesArray, null, 2)
            );

            break;
        }
    }
}

app.delete('/api/notes/:id', (req, res) => {
    deleteNote(req.params.id, allNotes);
    res.send("200");
});

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});