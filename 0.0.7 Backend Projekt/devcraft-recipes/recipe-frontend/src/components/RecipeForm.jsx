import { useState } from 'react';

export default function RecipeForm({ onSubmit }) {
	const [ingredientAmount, setIngredientAmount] = useState(1);

	const submitRecipe = (event) => {
		event.preventDefault();
		const formData = new FormData(event.target);
		// console.log('[Recipe Form] formData:', Object.fromEntries(formData));

		onSubmit({
			name: formData.get('name'),
			description: formData.get('description'),
			steps: formData.get('steps'),
			cookingTime: formData.get('cookingTime'),
			ingredients: [...Array(ingredientAmount).keys()].map((index) => {
				return {
					name: formData.get(`name-${index}`),
					amount: formData.get(`amount-${index}`),
					units: formData.get(`units-${index}`),
				};
			}),
		});
		event.target.reset();
	};
	return (
		<form onSubmit={submitRecipe} className='w-full max-w-lg mx-auto'>
			<div className='flex flex-col gap-2 justify-start items-start mb-6'>
				<label htmlFor='name' className='text-sm'>
					Name:
				</label>
				<input
					id='name'
					name='name'
					placeholder='Banana Bread'
					className='text-sm w-full'
				></input>
			</div>
			<div className='flex flex-col gap-2 justify-start items-start mb-6'>
				<label htmlFor='description' className='text-sm'>
					Description:
				</label>
				<input
					id='description'
					name='description'
					placeholder='Description'
					className='text-sm w-full'
				></input>
			</div>
			<div className='flex flex-col gap-2 justify-start items-start mb-6'>
				<label htmlFor='steps' className='text-sm'>
					Steps:
				</label>
				<textarea
					id='steps'
					name='steps'
					placeholder='1. Mash Bananas'
					className='text-sm w-full'
				></textarea>
			</div>
			<div className='flex flex-col gap-2 justify-start items-start mb-6'>
				<label htmlFor='cookingTime' className='text-sm'>
					Cooking Time (minutes):
				</label>
				<input
					id='cookingTime'
					name='cookingTime'
					placeholder='30'
					type='number'
					className='text-sm w-full'
				></input>
			</div>
			{[...Array(ingredientAmount).keys()].map((index) => {
				return (
					<fieldset
						className='flex gap-2 justify-start items-start mb-6'
						key={index}
					>
						<div className='flex flex-col gap-2'>
							<label
								htmlFor={`name-${index}`}
								className='text-sm self-start'
							>
								Ingredient Name:
							</label>
							<input
								id={`name-${index}`}
								name={`name-${index}`}
								placeholder='Bananas'
								className='text-sm w-full' // Ändern Sie die Breite hier
							></input>
						</div>
						<div className='flex flex-col gap-2'>
							<label
								htmlFor={`amount-${index}`}
								className='text-sm self-start'
							>
								Ingredient Amount:
							</label>
							<input
								id={`amount-${index}`}
								type='number'
								name={`amount-${index}`}
								placeholder='100'
								className='text-sm w-full' // Und hier
							></input>
						</div>
						<div className='flex flex-col gap-2'>
							<label
								htmlFor={`units-${index}`}
								className='text-sm self-start'
							>
								Ingredient Units:
							</label>
							<input
								id={`units-${index}`}
								name={`units-${index}`}
								placeholder='gr'
								className='text-sm w-full' // Und hier
							></input>
						</div>
					</fieldset>
				);
			})}
			<button
				className='px-4 py-1 border border-transparent text-base font-medium rounded-sm text-white bg-gray-600 hover:bg-gray-700 cursor-pointer mr-4 mt-1 w-full sm:w-auto mb-3'
				onClick={() => setIngredientAmount((amount) => amount + 1)}
			>
				Add Ingredient
			</button>
			<button
				className='px-4 py-1 border border-transparent text-base font-medium rounded-sm text-white bg-blue-600 hover:bg-blue-700 cursor-pointer mt-1 w-full sm:w-auto'
				type='submit'
			>
				Send
			</button>
		</form>
	);
}
