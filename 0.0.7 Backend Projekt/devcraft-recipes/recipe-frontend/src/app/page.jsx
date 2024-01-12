import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions } from '../lib/authOptions';
import { getRecipes } from '../lib/recipes';

const Home = async () => {
	// Die Server Session holen:
	const session = await getServerSession(authOptions);
	console.log('[Home] session: ', session);

	// Die Rezepte holen:
	const recipes = await getRecipes();

	// Um das zurückkommende Recipes Objekt vollständig zu loggen, müssen wir es in JSON umwandeln. Dazu nutzen wir die Methode JSON.stringify() und geben als zweiten Parameter null, 2 an. Das bedeutet, dass wir keine Transformation vornehmen wollen und die Einrückungstiefe 2 beträgt.
	console.log('[Home] recipes: ', JSON.stringify(recipes, null, 2));

	return (
		<>
			<div className='mb-12'>
				{session ? (
					<Link
						className='bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-sm'
						href={'/recipes'}
					>
						Add Recipe
					</Link>
				) : (
					<div className='h-6' /> // Platzhalter mit der gleichen Höhe wie der Button
				)}
			</div>

			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4'>
				{recipes.recipes &&
					Array.isArray(recipes.recipes.recipes) &&
					recipes.recipes.recipes.map((recipe) => (
						<div
							key={recipe.id}
							className='rounded overflow-hidden shadow-md p-6 bg-slate-50'
						>
							<h2 className='font-bold text-lg mb-2'>
								{recipe.name}
							</h2>
							<p className='text-gray-700 text-base'>
								{recipe.description}
							</p>
							<p className='text-gray-700 text-base'>
								{recipe.cookingTime}
							</p>
						</div>
					))}
			</div>
		</>
	);
};

export default Home;
