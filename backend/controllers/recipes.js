const Recipe = require('../models/recipes');
const asyncHandler = require('express-async-handler');

// @desc Get all Recipes
// @route GET /api/Recipes
// @access public
const getAllRecipes = asyncHandler( async (req, res) => {
    const recipes = await Recipe.find();
    res.status(200).json(recipes);
});

// @desc Get Recipe
// @route GET /api/Recipes/:id
// @access public
const getRecipe = asyncHandler( async (req, res) => {
    // const id = req.params.id;
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe){
        res.status(404);
        throw new Error("Recipe not Found");
    }
    res.status(200).json(recipe);
})

// @desc Create new Recipe
// @route POST /api/Recipes
// @access public
const createRecipe = asyncHandler( async (req, res) => {
    console.log(req.body);
    const { title, description, ingredients, instructions, image } = req.body;
    if (!title || !description || ingredients || instructions || image){
        res.status(400);
        throw new Error("All fields are mandatory");
    }

    const recipe = Recipe.create({
        title, description, ingredients, instructions, image
    })

    res.status(201).json(recipe);
})


// @desc Update Recipes
// @route PUT /api/Recipes
// @access public
const updateRecipe = asyncHandler( async (req, res) => {

    // const id = req.params.id;
    // const {name, email, phone} = req.body;

    const recipe = await Recipe.findById(req.params.id);
    if (!recipe){
        res.status(404);
        throw new Error("Recipe not found");
    }

    const updatedRecipe = await Recipe.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true}
    );

    res.status(200).json(updatedRecipe);
})


// @desc Delete Recipe
// @route DELETE /api/Recipes
// @access public
const deleteRecipe = asyncHandler( async (req, res) => {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe){
        res.status(404);
        throw new Error("Recipe not found");
    }
    const deletedRecipe = await Recipe.findByIdAndDelete(req.params.id);
    res.status(200).json(deletedRecipe);
})



module.exports = {getAllRecipes, getRecipe, createRecipe, updateRecipe, deleteRecipe};
