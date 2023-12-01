const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getAllIngredients = async () => {
	return prisma.ingredient.findMany();
};

exports.getIngredientById = async (ingredientId) => {
	const existingIngredient = await prisma.ingredient.findFirst({
		where: { id: ingredientId },
	});
	if (!existingIngredient) {
		return null;
	}
	return prisma.ingredient.findUnique({
		where: {
			id: ingredientId,
		},
	});
};

exports.createIngredient = async (name, quantity, unitOfMass) => {
	const existingIngredient = await prisma.ingredient.findFirst({
		where: { name },
	});
	if (existingIngredient) {
		return null;
	}
	return prisma.ingredient.create({
		data: {
			name,
			quantity,
			unitOfMass,
		},
	});
};

exports.updateIngredient = async (ingredientId, data) => {
	const existingIngredient = await prisma.ingredient.findFirst({
		where: { id: ingredientId },
	});
	if (!existingIngredient) {
		return null;
	}
	return prisma.ingredient.update({
		where: {
			id: ingredientId,
		},
		data,
	});
};

exports.deleteIngredient = async (ingredientId) => {
	const existingIngredient = await prisma.ingredient.findFirst({
		where: { id: ingredientId },
	});
	if (!existingIngredient) {
		return null;
	}
	return prisma.ingredient.delete({
		where: {
			id: ingredientId,
		},
	});
};
