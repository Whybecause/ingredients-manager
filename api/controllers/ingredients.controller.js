const db = require("../models")
const Ingredient = db.ingredient

exports.addIngredient = async (req, res) => {
    let ingredient = new Ingredient(req.body)
    let result
    
    ingredient.validate(async (err) => {
        if (err) return res.status(422).json(err)

        try {
            ingredient.date = new Date().toISOString()
            result = await ingredient.save()
            res.status(200).json(result)
        } catch(e) {
            res.status(400).json(e)
        }
    })
}

exports.getIngredients = async (req, res) => {
    try {
        const ingredients = await Ingredient.find({}).sort({ _id: -1})
        res.status(200).json(ingredients)
    } catch(e) {
        res.status(404).json(e)
    }
}

exports.updateIngredient = async (req, res) => {
    const { name, quantity } = req.body
    let ingredient
    let updatedIngredient

    try {
        ingredient = await Ingredient.findOne({ _id: req.params.id})
        if (!ingredient) return res.status(404).json({})

        if (name) ingredient.name = name
        if (quantity || quantity == 0) ingredient.quantity = quantity

        updatedIngredient = await ingredient.save()
        res.status(200).json(updatedIngredient)
    } catch (e) {
        res.status(400).json(e)
    }
}

exports.deleteIngredient = async (req, res) => {
    try {
        const result = await Ingredient.deleteOne({ _id: req.params.id })
        if (result.n > 0) {
            res.status(200).json({message: "Deleted"})
        } else {
            res.status(401).json("Error")
        }
    } catch(e) {
        res.status(400).json(e)
    }
}

exports.deleteAllIngredients = async (req, res) => {
    try {
        await Ingredient.deleteMany({})
        res.status(200).json({message: "All ingredients have been deleted"})
    } catch(e) {
        res.status(400).json(e)
    }
}