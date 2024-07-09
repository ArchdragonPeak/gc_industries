const express = require('express');
const router = express.Router();
const UserModel = require('../models/UserSchema');
const bcrypt = require('bcrypt');
const authMiddleware = require('../middleware/authMiddleware'); // Importiere die Middleware

// GET /users
router.get('/', authMiddleware, async (req, res) => {
    try {
        const users = await UserModel.find();
        res.json(users);
    } catch (error) {
        console.error('Error retrieving users:', error);
        res.status(500).send('Error retrieving users');
    }
});

// GET /users/:id
router.get('/:id', authMiddleware, async (req, res) => {
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
router.post('/', authMiddleware, async (req, res) => {
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
router.post('/set-favgame', authMiddleware, async (req, res) => {
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

// PUT / Ändert Name, Email oder Passwort
router.put('/:id', authMiddleware, async (req, res) => {
    const { id } = req.params;
    const { username, email, currentPassword, newPassword } = req.body;

    try {
        const user = await UserModel.findOne({ userID: id });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (username) user.username = username;
        if (email) user.email = email;

        if (currentPassword && newPassword) {
            const isMatch = await bcrypt.compare(currentPassword, user.password);
            if (!isMatch) {
                return res.status(400).json({ message: 'Current password is incorrect' });
            }
            user.password = await bcrypt.hash(newPassword, 10);
        }

        await user.save();

        res.json({ username: user.username, email: user.email });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

module.exports = router;