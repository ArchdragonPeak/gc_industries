const mongoose = require("mongoose");
const express = require('express');
const app = express();
const port = 3001;

const fs = require('fs');
const path = require('path');


// Pfad zur Passwortdatei
const passwordFilePath = path.join(__dirname, '../dbpassword.config');
// Passwort auslesen und ausgeben
const pass = fs.readFileSync(passwordFilePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Fehler beim Lesen der Datei:', err);
        process.exit(1);
    }
    console.log(`Das Passwort ist: ${data}`);
    return data;
});
const uri = "mongodb+srv://gcindustries:"+pass+"@uebung2.c6giab7.mongodb.net/?retryWrites=true&w=majority&appName=uebung2";
const clientOptions = {
    serverApi: {
        version: '1',
        strict: true,
        deprecationErrors: true
    }
};

const GameSchema = new mongoose.Schema({
    gameID: Number,
    name: String,
    category: Array,
    comments: Array,
    ratings: Array,
    tags: Array
});

const GameModel = mongoose.model("GameModel", GameSchema);

async function run() {
    try {
        await mongoose.connect(uri, clientOptions);
        console.log("Connected to MongoDB!");

        app.listen(port, () => {
            console.log(`Server running at http://localhost:${port}/`);
        });
    } catch (error) {
        console.error("Failed to connect to MongoDB:", error);
        process.exit(1);
    }
}

run();

app.get('/games', async (req, res) => {
    try {
        const games = await GameModel.find({});
        res.json(games);
    } catch (error) {
        res.status(500).send("Error retrieving games");
    }
});

module.exports = GameModel;