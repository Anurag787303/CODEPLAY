const mongoose = require('mongoose')
const crypto = require('crypto')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required']
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    problems: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Problem'
    }
})

userSchema.pre('save', function (next) {
    if (!this.isModified('password')) {
        return next()
    }

    this.password = crypto.pbkdf2Sync(this.password, 'salt', 1000, 64, 'sha512').toString('hex')
    next()
})

userSchema.methods.validPassword = function (password) {
    const hash = crypto.pbkdf2Sync(password, 'salt', 1000, 64, 'sha512').toString('hex')
    return this.password === hash
}

module.exports = mongoose.model("User", userSchema)