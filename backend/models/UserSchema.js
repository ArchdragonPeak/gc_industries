const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const UserSchema = new mongoose.Schema({
    userID: { type: Number, unique: true },
    username: String,
    email: { type: String, unique: true},
    password: { type: String, required: true },
    profilepicture: String,
    favgame: Number

}, { toJSON: { virtuals: true }, toObject: { virtuals: true } });

UserSchema.virtual('id').get(function() {
    return this._id.toHexString();
});

UserSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

UserSchema.methods.comparePassword = function(candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

UserSchema.plugin(AutoIncrement, { inc_field: 'userID' });
const UserModel = mongoose.model('UserModel', UserSchema);
module.exports = UserModel;
