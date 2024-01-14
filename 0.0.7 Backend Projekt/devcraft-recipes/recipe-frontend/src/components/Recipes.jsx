'use client';

import { useEffect, useState } from 'react';
import { createRecipe } from '../lib/recipes';
import RecipeForm from './RecipeForm';
import { useSession } from 'next-auth/react';
import { getSession } from 'next-auth/react'; // Holt die Session nach dem anmelden.

export default function Recipes() {
	// const [recipes, setRecipes] = useState([]);
	const { data: session } = useSession();

	console.log('[Recipes Component] session: ', session);

	// const loadData = () => {
	// 	fetch(`${api}/recipes`)
	// 		.then((response) => response.json())
	// 		.then((data) => setRecipes(data));
	// };

	let saveData = async (formData) => {
		// console.log('[Recipe Page] Form data:', formData);

		// Create a new recipe object
		const newRecipe = {
			name: formData.name,
			description: formData.description,
			steps: formData.steps.split('\n'),
			cookingTime: parseInt(formData.cookingTime),
			// userId: 1, // Replace this with the actual user ID
			userId: parseInt(session?.user?.id),
			ingredients: formData.ingredients.map((ingredient) => ({
				name: ingredient.name,
				unit: ingredient.units,
				amount: parseFloat(ingredient.amount),
			})),
		};

		// Send the new recipe to the backend
		const response = await createRecipe(newRecipe);

		if (response.error) {
			// Handle error
			console.error(
				'[Recipe Page] Error creating recipe:',
				response.error
			);
		} else {
			console.log('[Recipe Page] Recipe created:', response);
		}
	};

	// load data on start
	// useEffect(() => {
	//   loadData();
	// }, []);
	// return (
	// 	<main className='flex min-h-screen flex-col items-center justify-between p-24'>
	// 		<h1 className={`mb-3 text-2xl font-semibold`}>Add a recipe:</h1>
	// 		<RecipeForm onSubmit={saveData} />
	// 		<ul class='list-disc list-inside'>
	// 			{recipes.map((recipe, index) => {
	// 				return (
	// 					<li key={index}>
	// 						<span class='bold'>{recipe.name}</span>
	// 						<ul class='list-disc list-inside pl-4'>
	// 							{recipe.ingredients.map(
	// 								(ingredient, ingredientIndex) => {
	// 									return (
	// 										<li key={ingredientIndex}>
	// 											<span class='font-bold'>
	// 												{ingredient.name}
	// 											</span>
	// 											: {ingredient.amount}{' '}
	// 											{ingredient.units}
	// 										</li>
	// 									);
	// 								}
	// 							)}
	// 						</ul>
	// 					</li>
	// 				);
	// 			})}
	// 		</ul>
	// 	</main>
	// );

	return (
		<main className='flex flex-col items-center justify-start p-6 md:p-24 min-h-screen bg-slate-50 mt-16 rounded-md shadow-md'>
			<h1 className='mb-4 text-xl md:text-xl font-semibold text-gray-700'>
				Add a recipe:
			</h1>

			<div className='w-full'>
				<RecipeForm onSubmit={saveData} />
			</div>
		</main>
	);
}
