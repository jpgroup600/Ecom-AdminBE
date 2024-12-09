const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    birthDate: {
        type: String,
        required: false,
    },
    gender: {
        type: String,
        required: true,
    },
    influenceType: {
        type: Object,
        required: true,
    },
    
    userType: {
        type: String,
        required: true,
    },
    registerDate: {
        type: Date,
        default: Date.now,
      },
});

const UserModel = mongoose.model('users', UserSchema);
module.exports = UserModel;
