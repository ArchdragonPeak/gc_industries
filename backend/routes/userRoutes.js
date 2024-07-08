const express = require('express');
const router = express.Router();
const UserModel = require('../models/UserSchema');

// GET /users
router.get('/', async (req, res) => {
    try {
        const users = await UserModel.find();
        res.json(users);
    } catch (error) {
        console.error('Error retrieving users:', error);
        res.status(500).send('Error retrieving users');
    }
});

// GET /users/:id
router.get('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const user = await UserModel.findOne({ userID: id });
        if (user) {
            res.json(user);
        } else {
            res.status(404).send('User not found');
        }
    } catch (error) {
        console.error('Error retrieving user:', error);
        res.status(500).send('Error retrieving user');
    }
});

// POST /users
router.post('/', async (req, res) => {
    try {
        const user = new UserModel(req.body);
        const savedUser = await user.save();
        res.status(201).send(savedUser);
    } catch (error) {
        console.error('Error saving user:', error);
        res.status(500).json(error);
    }
});

// POST /set-favgame
router.post('/set-favgame', async (req, res) => {
    const { userID, favgame } = req.body;

    const numericUserID = Number(userID);
    const numericFavgame = Number(favgame);

    if (isNaN(numericUserID) || isNaN(numericFavgame)) {
        return res.status(400).json({ message: 'userID und favgame müssen gültige Zahlen sein' });
    }

    try {
        const updatedUser = await UserModel.findOneAndUpdate(
            { userID: userID },
            { favgame: favgame },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'Benutzer nicht gefunden' });
        }

        res.json({ message: 'Lieblingsspiel erfolgreich aktualisiert', user: updatedUser });
    } catch (error) {
        console.error('Fehler beim Aktualisieren des Lieblingsspiels:', error);
        res.status(500).json({ message: 'Interner Serverfehler' });
    }
});

module.exports = router;