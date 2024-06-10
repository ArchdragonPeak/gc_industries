const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require("mongoose")
const cors = require('cors')

const GameModel = require('./models/GameSchema')

const app = express();
const port = 3000;

app.use(cors())
app.use(bodyParser.json());

// GET /games
app.get('/games', (req, res) => {
    try {
        const games = GameModel.find();
        res.json(games);
    } catch (error) {
        res.status(500).send('Error retrieving games');
    }
});

// GET /games/:id
app.get('/games/:id', (req, res) => {
    const id = (req.params.id);

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send('ID invalid');
    }

    try {
        const game = GameModel.findById(id);
        if (game) {
            res.json(game);
        } else {
            res.status(404).send({message: 'Game not found'});
        }
    } catch (error) {
        res.status(500).send('Error retrieving game');
    }
});

// POST /games
app.post('/games', (req, res) => {
    try {
        const game = new GameModel(req.body);
        const savedGame = game.save();
        res.status(201).send(savedGame);
    } catch (error) {
        res.status(500).json(error);
    }
});

// PUT /games/:id
app.put('/games/:id', (req, res) => {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send('ID invalid');
    }

    try {
        const updatedGame = GameModel.findByIdAndUpdate(id, req.body, { new: true });
        if (updatedGame) {
            res.json(updatedGame);
        } else {
            res.status(404).send('Game not found');
        }
    } catch (error) {
        res.status(500).send('Error updating game');
    }
});

// DELETE /games/:id
app.delete('/games/:id', (req, res) => {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send('ID invalid');
    }

    try {
        const deletedGame = GameModel.findByIdAndDelete(id);
        if (deletedGame) {
            res.json(deletedGame);
        } else {
            res.status(404).send('Game not found');
        }
    } catch (error) {
        res.status(500).send('Error deleting game');
    }
});


// Starten des Servers
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});