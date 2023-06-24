const express = require('express');
const router = express.Router();
const { getAllRecipes, getRecipe, createRecipe, updateRecipe, deleteRecipe } = require("../controllers/recipes");
const multer = require("multer");
const Recipe = require('../models/recipes');


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + "." + file.originalname.split('.')[1] );
    }
});


let upload = multer({storage}).single('image');


router.route("/").get(getAllRecipes);


router.route("/recipes").post((req, res) => {
  const recipe = new Recipe({
        title: req.body.title,
        description: req.body.description,
        ingredients: req.body.ingredients,
        instructions: req.body.instructions,
        // image: req.file.filename,
      image: req.body.image,
  })

    recipe.save().then((recipe) => {
        res.status(201).json(recipe);
    }).catch((err) => {
        res.status(400).json(err);
    });
});


router.route("/recipes/:id").get(getRecipe).put(updateRecipe).delete(deleteRecipe);



module.exports = router;
