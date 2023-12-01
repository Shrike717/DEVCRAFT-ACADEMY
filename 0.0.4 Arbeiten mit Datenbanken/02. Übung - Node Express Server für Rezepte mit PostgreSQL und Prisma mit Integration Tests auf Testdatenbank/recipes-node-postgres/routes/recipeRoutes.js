const express = require('express');
const {
	getAllRecipes,
	getRecipeById,
	createRecipe,
	updateRecipe,
	deleteRecipe,
	addIngredientsInRecipe,
	getAllIngredientsInRecipe,
	getIngredientInRecipe,
	updateIngredientInRecipe,
	deleteIngredientInRecipe,
} = require('../controllers/recipeController');

const router = express.Router();

// Rezepte
router.get('/', getAllRecipes);
router.get('/:recipeId', getRecipeById);
router.post('/', createRecipe);
router.put('/:recipeId', updateRecipe);
router.delete('/:recipeId', deleteRecipe);
// Ingredients in Rezepten
router.put('/:recipeId/ingredients', addIngredientsInRecipe); // Ingredients hinzufügen
router.get('/:recipeId/ingredients', getAllIngredientsInRecipe); // Alle Ingredients in Rezept anzeigen
router.get('/:recipeId/ingredients/:ingredientId', getIngredientInRecipe); // Ingredient in Rezept anzeigen
router.put('/:recipeId/ingredients/:ingredientId', updateIngredientInRecipe); // Ingredient updaten
router.delete('/:recipeId/ingredients/:ingredientId', deleteIngredientInRecipe); // Ingredient löschen

module.exports = router;
