const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const UserSchema = new mongoose.Schema({
    userID: { type: Number, unique: true },
    username: String,
    profilepicture: String
}, { toJSON: { virtuals: true }, toObject: { virtuals: true } });

UserSchema.virtual('id').get(function() {
    return this._id.toHexString();
});

UserSchema.plugin(AutoIncrement, { inc_field: 'userID' });
const UserModel = mongoose.model('UserModel', UserSchema);
module.exports = UserModel;