const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const GameModel = require('./models/GameSchema');
const UserModel = require('./models/UserSchema');

const app = express();
const port = 3000;

app.use(cors());
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
    const id = req.params.id;

    try {
        const game = await GameModel.findOne({ gameID: id }).populate({
            path: 'comments.userID',
            model: 'UserModel',
            select: 'username profilepicture'
        });
        if (game) {
            res.json(game);
        } else {
            res.status(404).send({ message: 'Game not found' });
        }
    } catch (error) {
        res.status(500).send('Error retrieving game');
        console.error(error);
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
        const updatedGame = await GameModel.findOneAndUpdate({ gameID: id }, req.body, { new: true });
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
        const deletedGame = await GameModel.findOneAndDelete({ gameID: id });
        if (deletedGame) {
            res.json(deletedGame);
        } else {
            res.status(404).send('Game not found');
        }
    } catch (error) {
        res.status(500).send('Error deleting game');
    }
});

// GET /games/:id/comments
app.get('/games/:id/comments', async (req, res) => {
    const id = req.params.id;

    try {
        const game = await GameModel.findOne({ gameID: id }).populate({
            path: 'comments.userID',
            model: 'UserModel',
            select: 'username profilepicture'
        });
        if (game) {
            res.json(game.comments);
        } else {
            res.status(404).send('Game not found');
        }
    } catch (error) {
        res.status(500).send('Error retrieving comments');
    }
});

// POST /games/:id/comments
app.post('/games/:id/comments', async (req, res) => {
    const id = req.params.id;

    try {
        const game = await GameModel.findOne({ gameID: id });
        if (game) {
            game.comments.push(req.body);
            const updatedGame = await game.save();
            res.status(201).send(updatedGame);
        } else {
            res.status(404).send('Game not found');
        }
    } catch (error) {
        res.status(500).json(error);
    }
});

// DELETE /games/:id/comments/:commentId
app.delete('/games/:id/comments/:commentId', async (req, res) => {
    const { id, commentId } = req.params;

    try {
        const game = await GameModel.findOne({ gameID: id });
        if (game) {
            game.comments.id(commentId).remove();
            const updatedGame = await game.save();
            res.json(updatedGame);
        } else {
            res.status(404).send('Game not found');
        }
    } catch (error) {
        res.status(500).send('Error deleting comment');
    }
});

// GET /users/:id
app.get('/users/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const user = await UserModel.findOne({ userID: id });
        if (user) {
            res.json(user);
        } else {
            res.status(404).send({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).send('Error retrieving user');
    }
});

// POST /users
app.post('/users', async (req, res) => {
    try {
        const user = new UserModel(req.body);
        const savedUser = await user.save();
        res.status(201).send(savedUser);
    } catch (error) {
        res.status(500).json(error);
    }
});

// Starten des Servers
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});