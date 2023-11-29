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
} = require('../models/recipeModel');

exports.getAllRecipes = async (req, res) => {
	try {
		const recipes = await getAllRecipes(); // Hier wird die Funktion aus dem Model aufgerufen
		res.json(recipes);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Internal Server Error' });
	}
};

exports.getRecipeById = async (req, res) => {
	try {
		const { recipeId } = req.params;
		const recipe = await getRecipeById(parseInt(recipeId));

		if (!recipe) {
			return res.status(404).json({ message: 'Rezept nicht gefunden' });
		}

		res.json(recipe);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Internal Server Error' });
	}
};

exports.createRecipe = async (req, res) => {
	try {
		const { title, description, preparation, userId } = req.body;
		if (!title || !description || !preparation || !userId) {
			return res
				.status(400)
				.json({ message: 'Bitte alle Felder ausfüllen' });
		}

		const newRecipe = await createRecipe(
			title,
			description,
			preparation,
			userId
		);

		if (!newRecipe) {
			return res.status(404).json({ message: 'Benutzer nicht gefunden' });
		}

		res.status(201).json({
			message: 'Das Rezept wurde erfolreich erstellt',
			newRecipe,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Internal Server Error' });
	}
};

exports.updateRecipe = async (req, res) => {
	try {
		const { recipeId } = req.params;
		const newData = req.body;
		const updatedRecipe = await updateRecipe(parseInt(recipeId), newData);

		if (!updatedRecipe) {
			return res.status(404).json({ message: 'Rezept nicht gefunden' });
		}

		res.json({
			message: 'Rezept wurde erfolgreich aktualisiert',
			updatedRecipe,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Internal Server Error' });
	}
};

exports.deleteRecipe = async (req, res) => {
	try {
		const { recipeId } = req.params;
		const deletedRecipe = await deleteRecipe(parseInt(recipeId));

		if (!deletedRecipe) {
			return res.status(404).json({ message: 'Rezept nicht gefunden' });
		}

		res.json({ message: 'Rezept erfolgreich gelöscht' });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Internal Server Error' });
	}
};

// ********** Ingredients in Rezepten **********

// Ingredients zu Rezept hinzufügen:
exports.addIngredientsInRecipe = async (req, res) => {
	const { recipeId, ingredientIds } = req.body;

	try {
		const updatedRecipe = await addIngredientsInRecipe(
			recipeId,
			ingredientIds
		);

		if (!updatedRecipe) {
			return res.status(404).json({
				message: 'Eine oder mehrere Zutaten nicht gefunden',
			});
		}

		res.status(200).json({
			message: 'Zutaten erfolgreich hinzugefügt',
			data: updatedRecipe,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Interner Serverfehler' });
	}
};

// Alle Ingredients in Rezept anzeigen:
exports.getAllIngredientsInRecipe = async (req, res) => {
	const { recipeId } = req.params;
	try {
		const ingredients = await getAllIngredientsInRecipe(recipeId);

		if (ingredients.length === 0) {
			return res.status(404).json({
				message: 'Rezept nicht gefunden',
			});
		}

		res.status(200).json(ingredients);
	} catch (error) {
		res.status(500).json({ message: 'Interner Serverfehler' });
	}
};

// Ingredient in Rezept anzeigen:
exports.getIngredientInRecipe = async (req, res) => {
	const { recipeId, ingredientId } = req.params;
	try {
		const ingredient = await getIngredientInRecipe(recipeId, ingredientId);

		if (!ingredient) {
			return res.status(404).json({
				message: 'Zutat nicht gefunden',
			});
		}

		res.status(200).json(ingredient);
	} catch (error) {
		res.status(500).json({ message: 'Interner Serverfehler' });
	}
};

// Ingredient in Rezept updaten:
exports.updateIngredientInRecipe = async (req, res) => {
	const { recipeId, ingredientId } = req.params;
	const updatedIngredientData = req.body;
	try {
		const updatedIngredient = await updateIngredientInRecipe(
			recipeId,
			ingredientId,
			updatedIngredientData
		);

		if (!updatedIngredient) {
			return res.status(404).json({
				message: 'Zutat nicht gefunden',
			});
		}

		res.status(200).json(updatedIngredient);
	} catch (error) {
		res.status(500).json({ message: 'Interner Serverfehler' });
	}
};

// Ingredient aus Rezept löschen:
exports.deleteIngredientInRecipe = async (req, res) => {
	const { recipeId, ingredientId } = req.params;
	try {
		const deletedIngredient = await deleteIngredientInRecipe(
			recipeId,
			ingredientId
		);

		if (!deletedIngredient) {
			return res.status(404).json({
				message: 'Zutat nicht gefunden',
			});
		}

		res.status(204).json({ message: 'Zutat erfolgreich gelöscht' }).end();
	} catch (error) {
		res.status(500).json({ message: 'Interner Serverfehler' });
	}
};
