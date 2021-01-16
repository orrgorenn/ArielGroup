const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    authLevel: {
        type: Number,
        required: true,
        default: 1,
    },
    profilePicture: {
        type: String,
        required: true,
        default: 'default.png',
    },
    site: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'site',
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

module.exports = User = mongoose.model('user', UserSchema);
