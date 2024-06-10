const mongoose = require("mongoose");
const fs = require('fs');
const path = require('path');

// Pfad zur Passwortdatei
const passwordFilePath = path.join(__dirname, '../dbpassword.config');

// Passwort auslesen und ausgeben
const pass = fs.readFileSync(passwordFilePath, 'utf8').trim();
const uri = `mongodb+srv://gcindustries:${pass}@uebung2.c6giab7.mongodb.net/?retryWrites=true&w=majority&appName=uebung2`;

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
    gamelogo: String,
    tags: [String],
    ratings: [Number],
    comments: [String]
});

const GameModel = mongoose.model("GameModel", GameSchema);

async function run() {
    try {
        await mongoose.connect(uri, clientOptions);
        console.log('Connected to MongoDB!');
    } catch (error) {
        console.error('Failed to connect to MongoDB:', error);
        process.exit(1);
    }
}

run();

module.exports = GameModel;