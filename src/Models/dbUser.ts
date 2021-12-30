const mongoose = require('mongoose');

const PizaSchema = new mongoose.Schema({
    size: {
        type: String,
        required: true
    },
    toppings: {
        type: Array,
        required: true
    },
    gluten: {
        type: String,
        required: true
    },
    specialInstructions: {
        type: String,
        required: true
    }
});

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Pizza = mongoose.model('Pizza', PizaSchema);
const User = mongoose.model('User', UserSchema);

module.exports = Pizza;
module.exports = User;