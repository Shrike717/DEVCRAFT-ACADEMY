import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions } from '../lib/authOptions';
import { getRecipes } from '../lib/recipes';
import { Clock, Bolt, XCircle } from 'lucide-react';

const Home = async () => {
	// Die Server Session holen:
	const session = await getServerSession(authOptions);
	console.log('[Home] session: ', session);

	// Die Rezepte holen:
	const recipes = await getRecipes();

	// Um das zurückkommende Recipes Objekt vollständig zu loggen, müssen wir es in JSON umwandeln. Dazu nutzen wir die Methode JSON.stringify() und geben als zweiten Parameter null, 2 an. Das bedeutet, dass wir keine Transformation vornehmen wollen und die Einrückungstiefe 2 beträgt.
	// console.log('[Home] recipes: ', JSON.stringify(recipes, null, 2));

	return (
		<>
			<div className='mb-12'>
				{session ? (
					<Link
						className='bg-green-800 hover:bg-green-900 text-white font-bold py-2 px-4 rounded-sm'
						href={'/recipes'}
					>
						Add Recipe
					</Link>
				) : (
					<div className='h-6' /> // Platzhalter mit der gleichen Höhe wie der Button
				)}
			</div>

			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8'>
				{recipes.recipes &&
					Array.isArray(recipes.recipes.recipes) &&
					recipes.recipes.recipes.map((recipe) => (
						<div
							key={recipe.id}
							className='relative rounded overflow-hidden shadow-md p-6 rounded-t-xl bg-slate-50'
						>
							<div className='absolute top-0 left-0 right-0 h-[9rem] rounded-t-xl bg-custom-card' />
							<h2 className='font-bold text-base my-2 pt-36'>
								{recipe.name}
							</h2>
							<p className='text-gray-700 text-sm'>
								{recipe.description}
							</p>
							<div className='flex justify-between items-center mt-4'>
								<div className='flex items-center'>
									<Clock
										strokeWidth={2}
										width={18}
										height={18}
									/>
									<p className='text-gray-700 text-sm ml-2'>
										{recipe.cookingTime} min
									</p>
								</div>
								<div className='flex space-x-3'>
									<Bolt
										className='text-blue-800'
										strokeWidth={2}
										width={20}
										height={20}
									/>
									<XCircle
										className='text-red-800'
										strokeWidth={2}
										width={20}
										height={20}
									/>
								</div>
							</div>
						</div>
					))}
			</div>
		</>
	);
};

export default Home;
