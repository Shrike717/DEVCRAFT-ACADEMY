// Import des Prisma Client:
const { prisma } = require('../prisma/index');

exports.getAllRecipes = async () => {
	return prisma.recipe.findMany();
};

exports.getRecipeById = async (recipeId) => {
	const existingRecipe = await prisma.recipe.findFirst({
		where: { id: recipeId },
	});
	if (!existingRecipe) {
		return null;
	}
	return prisma.recipe.findUnique({
		where: {
			id: recipeId,
		},
		include: {
			ingredients: true,
		},
	});
};

exports.createRecipe = async (title, description, preparation, userId) => {
	const user = await prisma.user.findUnique({
		where: { id: userId },
	});
	if (!user) {
		return null;
	}

	return prisma.recipe.create({
		data: {
			title,
			description,
			preparation,
			userId,
		},
	});
};

exports.updateRecipe = async (recipeId, newData) => {
	const recipe = await prisma.recipe.findUnique({
		where: { id: parseInt(recipeId) },
	});
	if (!recipe) {
		return null;
	}

	return prisma.recipe.update({
		where: { id: recipeId },
		data: newData,
	});
};

exports.deleteRecipe = async (recipeId) => {
	const recipe = await prisma.recipe.findUnique({
		where: { id: parseInt(recipeId) },
	});
	if (!recipe) {
		return null;
	}

	return prisma.recipe.delete({
		where: { id: recipeId },
	});
};

// ********** Ingredients in Rezepten **********

// Ingredients in einem Rezept hinzufügen:
exports.addIngredientsInRecipe = async (recipeId, ingredientIds) => {
	const ingredients = await prisma.ingredient.findMany({
		where: {
			id: {
				in: ingredientIds,
			},
		},
	});

	if (ingredients.length !== ingredientIds.length) {
		return null;
	}

	const recipeIngredientPromises = ingredientIds.map((id) => {
		return prisma.recipeIngredient.create({
			data: {
				recipeId: recipeId,
				ingredientId: id,
			},
		});
	});

	return Promise.all(recipeIngredientPromises);
};

// Alle Ingredients in einem Rezept anzeigen:
exports.getAllIngredientsInRecipe = async (recipeId) => {
	const recipe = await prisma.recipe.findUnique({
		where: { id: parseInt(recipeId, 10) },
	});
	if (!recipe) {
		return [];
	}

	return prisma.recipeIngredient.findMany({
		where: {
			recipeId: parseInt(recipeId, 10),
		},
		include: {
			ingredient: true,
		},
	});
};

// Ingredient in einem Rezept anzeigen:
exports.getIngredientInRecipe = async (recipeId, ingredientId) => {
	const ingredientInRecipe = await prisma.recipeIngredient.findUnique({
		where: {
			recipeId_ingredientId: {
				recipeId: parseInt(recipeId, 10),
				ingredientId: parseInt(ingredientId, 10),
			},
		},
		include: {
			ingredient: true,
		},
	});
	if (!ingredientInRecipe) {
		return null;
	}
	return ingredientInRecipe;
};

// Ingredients in einem Rezept updaten:
exports.updateIngredientInRecipe = async (
	recipeId,
	ingredientId,
	updatedIngredientData
) => {
	const recipeIngredient = await prisma.recipeIngredient.findUnique({
		where: {
			recipeId_ingredientId: {
				recipeId: parseInt(recipeId, 10),
				ingredientId: parseInt(ingredientId, 10),
			},
		},
		include: {
			ingredient: true,
		},
	});
	if (!recipeIngredient) {
		return null;
	}
	return prisma.ingredient.update({
		where: {
			id: recipeIngredient.ingredient.id,
		},
		data: updatedIngredientData.ingredient,
	});
};

// Ingredients in einem Rezept löschen:
exports.deleteIngredientInRecipe = async (recipeId, ingredientId) => {
	const recipeIngredient = await prisma.recipeIngredient.findUnique({
		where: {
			recipeId_ingredientId: {
				recipeId: parseInt(recipeId, 10),
				ingredientId: parseInt(ingredientId, 10),
			},
		},
	});
	if (!recipeIngredient) {
		return null;
	}
	return prisma.recipeIngredient.delete({
		where: {
			recipeId_ingredientId: {
				recipeId: parseInt(recipeId, 10),
				ingredientId: parseInt(ingredientId, 10),
			},
		},
	});
};
