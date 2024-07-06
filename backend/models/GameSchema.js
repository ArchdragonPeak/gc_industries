const mongoose = require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);

const GameSchema = new mongoose.Schema({
    gameID: { type: Number, unique: true },
    name: { type: String, required: true },
    gamelogo: { type: String, required: true },
    tags: [String],
    ratings: [Number]
});

GameSchema.plugin(AutoIncrement, { inc_field: 'gameID' });

const GameModel = mongoose.model("GameModel", GameSchema);

module.exports = GameModel;