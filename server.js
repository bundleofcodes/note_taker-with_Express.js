const fs = require('fs');
const path = require('path');
const express = require('express');
const allNotes = 'db/db.json'
const app = express();
const PORT = process.env.PORT || 3001;
const { text } = require('express');
const { title } = require('process');
const shortid = require('shortid');


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.get('/api/notes', (req, res) => {
    fs.readFile('db/db.json', (err, data) => {
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


app.post('/api/notes', (req, res) => {
    const { title, text } = req.body;
    const id = shortid.generate()
    fs.readFile('db/db.json', (err, data) => {
        const allData = JSON.parse(data)
        const newData = {
            title,
            text,
            id
        }
        allData.push(newData)
        fs.writeFile('db/db.json', JSON.stringify(allData, null, 2), (err) => {
            if (err) throw err;
            res.send("200");
        })
    })

});


function deleteNote(id, callback, callbackString) {
    fs.readFile(path.join(__dirname, 'db/db.json'), 'utf8', (err, data) => {
      if (err) {
        callback(err);
      } else {
        const notes = JSON.parse(data);
        const updatedNotes = notes.filter(note => note.id !== id);
        fs.writeFile(path.join(__dirname, 'db/db.json'), JSON.stringify(updatedNotes, null, 2), err => {
          if (err) {
            callback(err);
          } else {
            callbackString('Note deleted successfully!');
          }
        });
      }
    });
  }

app.delete('/api/notes/:id', (req, res) => {
    deleteNote(req.params.id, (err) => {
        if (err) {
            res.status(500).send(err.toString());
        } else {
            res.send("200");
        }
    }, (message) => {
        res.send(message);
    });
});

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});