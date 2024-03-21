const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        default: "",
        unique: true,
    },

    lastName:{
        type: String,
        required: true,
        default: "",
        unique: true,
    },

    email: {
        type: String,
        required: true,
        default: "",
        unique: true  
    },

    password: {
        type: String,
        required: true,
        unique: true,
        default: "",
    },

    role: {
        type: String,
        default: "user",
    },

    // status: {
    //     type: String,
    //     default: "active",
    // },

    imagePath: {
        type: String,
        trim: true,
       
    },
    cloudinary_id:{
        type: String,
    },

    created: {
        type: Date,
        default: Date.now(),
    },

});

const User = mongoose.model('User',userSchema);
module.exports = User;
