const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const UserSchema = new mongoose.Schema({
    userID: { type: Number, unique: true },
    username: String,
    profilepicture: String
});

UserSchema.plugin(AutoIncrement, { inc_field: 'userID' });
const UserModel = mongoose.model('UserModel', UserSchema);

module.exports = UserModel;