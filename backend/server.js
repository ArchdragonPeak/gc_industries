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
app.get('/games', async (req, res) => {
    try {
        const games = await GameModel.find();
        res.json(games);
    } catch (error) {
        res.status(500).send('Error retrieving games');
    }
});

// GET /games/:id
app.get('/games/:id', async (req, res) => {
    const id = (req.params.id);

    try {
        const game = await GameModel.findOne({gameID:id});
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
app.post('/games', async (req, res) => {
    try {
        const game = new GameModel(req.body);
        const savedGame = await game.save();
        res.status(201).send(savedGame);
    } catch (error) {
        res.status(500).json(error);
    }
});

// PUT /games/:id
app.put('/games/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const updatedGame = await GameModel.findOneAndUpdate({gameID: id}, req.body, { new: true });
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
app.delete('/games/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const deletedGame = await GameModel.findOneAndDelete({gameID: id});
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