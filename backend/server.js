// Laden des Express-Frameworks
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require("mongoose")

const GameModel = require('./models/GameSchema')
const cors = require('cors')


const app = express();
app.use(cors())

const port = 3000;
// Middleware zum Parsen von JSON-Anforderungskörpern
app.use(bodyParser.json());


app.get('/games', (req, res) => {
    GameModel.find().then((doc) => res.json(doc))
});

app.get('/games/:id', (req, res) => {
    const id = (req.params.id);

    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).send('ID invalid');
        return
    }
    const game = GameModel.findById(id);
    if (game) {
        res.json(game);
    } else {
        res.status(404).send({message: 'Game not found'});
    }
});

app.post('/games', (req, res) => {
    let model = new GameModel(req.body)
    model.save()
        .then(doc => {
            if (!doc || doc.length === 0) {
                return res.status(500).send(doc)
            }
            res.status(201).send(doc)
        })
        .catch(err => {
            res.status(500).json(err)
        })
})

app.put('/games/:id', (req, res) => {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).send('ID invalid');
        return
    }
    GameModel.findByIdAndUpdate(id, req.body)
        .then((doc) => {
            if (doc)
                res.json(doc);
            else
                res.status(404).send('Game not found');
        })
});

app.delete('/games/:id', (req, res) => {
    const id = (req.params.id);

    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).send('ID invalid');
        return
    }

    GameModel.findByIdAndDelete(id).then(
        (deletedDocument) => {
            if (deletedDocument)
                res.json(deletedDocument);
            else
                res.status(404).send('Game not found');
        })
})


// Starten des Servers
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});