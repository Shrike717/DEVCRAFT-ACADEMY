'use client';
import RecipeForm from '../../components/RecipeForm';
import { api } from '../../lib/storage';
import Link from 'next/link';
import { useState } from 'react';

export default function Recipes() {
	const [recipes, setRecipes] = useState([
		{
			name: 'Banana Bread',
			ingredients: [{ name: 'Bananas', amount: 6, units: 'individual' }],
			steps: ['Smush bananas', '2. Eat bread'],
		},
		{
			name: 'Banana Bread',
			ingredients: [{ name: 'Bananas', amount: 6, units: 'individual' }],
			steps: ['Smush bananas', '2. Eat bread'],
		},
		{
			name: 'Banana Bread',
			ingredients: [{ name: 'Bananas', amount: 6, units: 'individual' }],
			steps: ['Smush bananas', '2. Eat bread'],
		},
	]);
	// const loadData = () => {
	// 	fetch(`${api}/recipes`)
	// 		.then((response) => response.json())
	// 		.then((data) => setRecipes(data));
	// };
	let saveData = (data) => {
		// Uncomment this to activate API access:
		// fetch(`${api}/recipes`, {
		//   method: "POST",
		//   body: JSON.stringify(data),
		// }).then((response) => loadData());
		// Comment the following line to enable API access
		// setRecipes((currentRecipes) => [...currentRecipes, data]);
	};

	// Uncomment this to activate API access:
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
		<main className='flex min-h-screen flex-col items justify-start p-24 bg-slate-50 mt-[4.8rem] rounded-md shadow-md'>
			<h1 className='mb-4 text-xl font-semibold text-gray-700'>
				Add a recipe:
			</h1>
			<div className='w-full '>
				<RecipeForm onSubmit={saveData} />
			</div>
			{/* <div className='w-full max-w-lg mt-8 bg-white p-6 rounded shadow'>
				<ul class='list-disc list-inside text-gray-700'>
					{recipes.map((recipe, index) => {
						return (
							<li key={index} className='mb-2'>
								<span class='font-bold'>{recipe.name}</span>
								<ul class='list-disc list-inside pl-4'>
									{recipe.ingredients.map(
										(ingredient, ingredientIndex) => {
											return (
												<li key={ingredientIndex}>
													<span class='font-bold'>
														{ingredient.name}
													</span>
													: {ingredient.amount}{' '}
													{ingredient.units}
												</li>
											);
										}
									)}
								</ul>
							</li>
						);
					})}
				</ul>
			</div> */}
		</main>
	);
}
