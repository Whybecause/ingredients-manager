const mongoose = require('mongoose')

const Ingredient = mongoose.model(
    "Ingredient",
    new mongoose.Schema({
        name: {
            type: String,
            required: true
        },
        quantity: {
            type: Number,
            required: true
        },
        date: {
            type: Date
        }
    }, { timestamps: true})
)

module.exports = Ingredient