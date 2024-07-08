const express = require('express');
const router = express.Router();
const GameModel = require('../models/GameSchema');
const CommentModel = require('../models/CommentSchema');
const authMiddleware = require('../middleware/authMiddleware'); // Stellen Sie sicher, dass die Middleware importiert wird

// GET /games - Öffentliche Route
router.get('/', async (req, res) => {
    try {
        const games = await GameModel.find();
        res.json(games);
    } catch (error) {
        console.error('Error retrieving games:', error);
        res.status(500).send('Error retrieving games');
    }
});

// GET /games/:id - Öffentliche Route
router.get('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const game = await GameModel.findOne({ gameID: id });
        if (game) {
            const comments = await CommentModel.find({ gameID: id }).populate({
                path: 'user',
                select: 'username profilepicture'
            });
            res.json({ game, comments });
        } else {
            res.status(404).send('Game not found');
        }
    } catch (error) {
        console.error('Error retrieving game:', error);
        res.status(500).send('Error retrieving game');
    }
});

// POST /games - Admin Route, erfordert Authentifizierung
router.post('/', authMiddleware, async (req, res) => {
    try {
        const game = new GameModel(req.body);
        const savedGame = await game.save();
        res.status(201).send(savedGame);
    } catch (error) {
        console.error('Error saving game:', error);
        res.status(500).json(error);
    }
});

// PUT /games/:id - Admin Route, erfordert Authentifizierung
router.put('/:id', authMiddleware, async (req, res) => {
    const id = req.params.id;
    try {
        const updatedGame = await GameModel.findOneAndUpdate({ gameID: id }, req.body, { new: true });
        if (updatedGame) {
            res.json(updatedGame);
        } else {
            res.status(404).send('Game not found');
        }
    } catch (error) {
        console.error('Error updating game:', error);
        res.status(500).send('Error updating game');
    }
});

// DELETE /games/:id - Admin Route, erfordert Authentifizierung
router.delete('/:id', authMiddleware, async (req, res) => {
    const id = req.params.id;
    try {
        const deletedGame = await GameModel.findOneAndDelete({ gameID: id });
        if (deletedGame) {
            await CommentModel.deleteMany({ gameID: id }); // Delete associated comments
            res.json(deletedGame);
        } else {
            res.status(404).send('Game not found');
        }
    } catch (error) {
        console.error('Error deleting game:', error);
        res.status(500).send('Error deleting game');
    }
});

module.exports = router;