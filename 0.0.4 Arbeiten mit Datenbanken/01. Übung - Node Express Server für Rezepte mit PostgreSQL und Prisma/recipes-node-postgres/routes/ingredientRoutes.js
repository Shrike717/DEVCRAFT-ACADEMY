const express = require('express');
const {
	getAllIngredients,
	getIngredientById,
	createIngredient,
	updateIngredient,
	deleteIngredient,
} = require('../controllers/ingredientController');

const router = express.Router();

router.get('/', getAllIngredients);
router.get('/:ingredientId', getIngredientById);
router.post('/', createIngredient);
router.put('/:ingredientId', updateIngredient);
router.delete('/:ingredientId', deleteIngredient);

module.exports = router;
