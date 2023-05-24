const fs = require('fs');
const uniqid = require('uniqid'); 
const router = require('express').Router();

router.get('/notes', (req, res) => {
    fs.readFile('./db/db.json', 'utf-8', (err, data) => {
        if (err) throw err;
        let notes = JSON.parse(data);
        res.status(200).json(notes);
    })
})

router.post('/notes', (req, res) => {
    console.log(req.body)
    // read the file then update the array then update the file with a new array
    req.body.id = uniqid();
    console.log(req.body)
    fs.readFile('./db/db.json', 'utf-8', (err, data) => {
        if (err) throw err;
        let notes = JSON.parse(data);
        notes.push(req.body);
        console.log(notes);
        fs.writeFile('./db/db.json', JSON.stringify(notes), (err, newData) => {
        if (err) throw err;
        res.status(200).json(notes);
        })
    })
})

router.delete('/notes/:id', (req, res) => {
    fs.readFile('./db/db.json', 'utf-8', (err, data) => {
        if (err) throw err;
        let notes = JSON.parse(data);
        // create for loop to search for note to be deleted
        //loop through each note 
        for (let i = 0; i < notes.length; i++) {
            const note = notes[i];
            //if this note's id matches the one provided, remove the note
            if (note.id === req.params.id) {
                notes.splice(i, 1);
                fs.writeFile('./db/db.json', JSON.stringify(notes), (err, data) => {
                    if (err) throw err;});
                res.status(200).json(notes);
                return;
            }
        }
        res.status(406).json( {message: "not found"});
    })
})

module.exports = router;