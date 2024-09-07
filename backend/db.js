const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://admin:244466666@cluster0.zxtr0ph.mongodb.net/paytmApp")

//Schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        min: 3,
        max: 50,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max: 1024,
        trim: true
    },
    firstName: {
        type: String,
        required: true,
        min: 3,
        max: 50,
        trim: true
    }, 
    lastName: {
        type: String,
        required: true,
        min: 3,
        max: 50,
        trim: true
    }
});

const bankSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    balance: {
        type: Number,
        required: true
    }
})

const User = mongoose.model('User', userSchema);
const Account = mongoose.model("Account", bankSchema)

module.exports = {
    User,
    Account
}