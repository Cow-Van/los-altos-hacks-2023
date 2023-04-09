const mongoose = require("mongoose");
const Recipe = require("../models/recipeModel");

const getRecipes = async (filters, limit) => {
    return await Recipe.find(filters).limit(limit);
}

const addRecipe = async (authorId, meal_of_day, ingredients, steps, imageUrl) => {
    return await Recipe.create({ author: authorId, meal_of_day: meal_of_day, ingredients: ingredients, steps: steps, image: imageUrl });
}

module.exports = {
    getRecipes,
    addRecipe,
}