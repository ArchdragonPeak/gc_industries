const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const CommentSchema = new mongoose.Schema({
    commentID: { type: Number, unique: true },
    gameID: { type: Number, ref: 'GameModel', required: true },
    userID: { type: Number, ref: 'UserModel', required: true },
    date: { type: Date, default: Date.now },
    text: { type: String, required: true }
    // rating: Number
}, { toJSON: { virtuals: true }, toObject: { virtuals: true } });

CommentSchema.virtual('user', {
    ref: 'UserModel',
    localField: 'userID',
    foreignField: 'userID',
    justOne: true
});

CommentSchema.plugin(AutoIncrement, { inc_field: 'commentID' });

const CommentModel = mongoose.model('CommentModel', CommentSchema);

module.exports = CommentModel;