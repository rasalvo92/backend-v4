// const mongoose = require ('mongoose');

// const userSchema = mongoose.Schema({
//     name: String,
//     image: String,
//     countInStock: {
//         type: Number,
//         required: true
//     }
// });

// exports.User = mongoose.model('User', userSchema);


//////////////

import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const userSchema = new Schema ({
    name: {
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
        minLength: 6
    }
});

export default mongoose.model ("User", userSchema);