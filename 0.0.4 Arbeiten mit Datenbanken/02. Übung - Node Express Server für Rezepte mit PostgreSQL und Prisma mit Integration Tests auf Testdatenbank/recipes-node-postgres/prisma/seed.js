const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const seedData = require('./seedData.json');

async function main() {
	for (const userData of seedData.users) {
		const user = await prisma.user.create({
			data: {
				username: userData.username,
				email: userData.email,
			},
		});

		for (const recipeData of userData.recipes) {
			const recipe = await prisma.recipe.create({
				data: {
					title: recipeData.title,
					description: recipeData.description,
					preparation: recipeData.preparation,
					userId: user.id,
				},
			});

			for (const ingredientData of recipeData.ingredients) {
				const ingredient = await prisma.ingredient.create({
					data: ingredientData,
				});

				await prisma.recipeIngredient.create({
					data: {
						recipeId: recipe.id,
						ingredientId: ingredient.id,
					},
				});
			}
		}
	}
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
