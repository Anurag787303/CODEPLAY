const mongoose = require('mongoose')

const problemSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required']
    },
    description: {
        type: String,
    },
    testcases: {
        type: [{
            input: String,
            output: String
        }],
    }
})

module.exports = mongoose.model("Problem", problemSchema)