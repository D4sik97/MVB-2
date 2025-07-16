const mongoose = require('mongoose');


const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: false,
        unique: false,
    },
    description: String
})

module.exports = mongoose.model('Category', categorySchema)