const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const GameSchema = new mongoose.Schema({
    gameID: { type: Number, unique: true },
    name: String,
    gamelogo: String,
    tags: [String],
    ratings: [Number],
    instruction: String,
    description: String,
    ishtml: Boolean,
    source: String
});

GameSchema.plugin(AutoIncrement, { inc_field: 'gameID' });
const GameModel = mongoose.model('GameModel', GameSchema);

module.exports = GameModel;