const express = require('express');
const router = express.Router();
const UserModel = require('../models/UserSchema');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Secret key for JWT
const JWT_SECRET = 'your_jwt_secret_key'; // ändern?

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    console.log("Login request: Email:", email," Password: ", password)
    try {
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            console.log("Invalid Password");
            return res.status(401).json({ message: 'Invalid password' });
        }

        const token = jwt.sign({ userId: user.userID }, JWT_SECRET);

        res.json({ token, user });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    console.log("--Versuchte Registrierung--", req.body);
    try {
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            console.error("User already exists", req.body)
            return res.status(400).json({ message: 'User already exists' });
        }

        const newUser = new UserModel({ username, email, password });
        await newUser.save();

        const token = jwt.sign({ userId: newUser.userID }, JWT_SECRET);
        res.json({ token, user: newUser });
        console.log("User has been added", newUser);

    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;