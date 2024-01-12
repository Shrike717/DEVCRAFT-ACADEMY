import { useState } from 'react';

// export default function RecipeForm({ onSubmit }) {
// 	const [ingredientAmount, setIngredientAmount] = useState(1);

// 	const submitRecipe = (event) => {
// 		event.preventDefault();
// 		const formData = new FormData(event.target);
// 		console.log(Object.fromEntries(formData));

// 		onSubmit({
// 			name: formData.get('name'),
// 			steps: formData.get('steps'),
// 			ingredients: [...Array(ingredientAmount).keys()].map((index) => {
// 				return {
// 					name: formData.get(`name-${index}`),
// 					amount: formData.get(`amount-${index}`),
// 					units: formData.get(`units-${index}`),
// 				};
// 			}),
// 		});
// 		event.target.reset();
// 	};
// 	return (
// 		<form onSubmit={submitRecipe}>
// 			<div className='flex gap-4 justify-center items-center mb-6'>
// 				<label for='name'>Name:</label>
// 				<input id='name' name='name' placeholder='Banana Bread'></input>
// 			</div>
// 			<div className='flex gap-4 justify-center items-center mb-6'>
// 				<label for='steps'>Steps:</label>
// 				<textarea
// 					id='steps'
// 					name='steps'
// 					placeholder='1. Eat banana bread'
// 				></textarea>
// 			</div>
// 			{[...Array(ingredientAmount).keys()].map((index) => {
// 				return (
// 					<fieldset
// 						className='flex gap-4 justify-center items-center mb-6'
// 						key={index}
// 					>
// 						<label for={`name-${index}`}>Ingredient Name:</label>
// 						<input
// 							id={`name-${index}`}
// 							name={`name-${index}`}
// 							placeholder='Bananas'
// 						></input>
// 						<label for={`amount-${index}`}>
// 							Ingredient Amount:
// 						</label>
// 						<input
// 							id={`amount-${index}`}
// 							type='number'
// 							name={`amount-${index}`}
// 							placeholder='6'
// 						></input>
// 						<label for={`units-${index}`}>Ingredient Units:</label>
// 						<input
// 							id={`units-${index}`}
// 							name={`units-${index}`}
// 							placeholder='bunches'
// 						></input>
// 					</fieldset>
// 				);
// 			})}
// 			<button
// 				className='group underline rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30'
// 				onClick={() => setIngredientAmount((amount) => amount + 1)}
// 			>
// 				Add Ingredient
// 			</button>
// 			<input
// 				className='group underline rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30'
// 				type='submit'
// 			/>
// 		</form>
// 	);
// }

// export default function RecipeForm({ onSubmit }) {
// 	const [ingredientAmount, setIngredientAmount] = useState(1);

// 	const submitRecipe = (event) => {
// 		event.preventDefault();
// 		const formData = new FormData(event.target);
// 		console.log(Object.fromEntries(formData));

// 		onSubmit({
// 			name: formData.get('name'),
// 			steps: formData.get('steps'),
// 			ingredients: [...Array(ingredientAmount).keys()].map((index) => {
// 				return {
// 					name: formData.get(`name-${index}`),
// 					amount: formData.get(`amount-${index}`),
// 					units: formData.get(`units-${index}`),
// 				};
// 			}),
// 		});
// 		event.target.reset();
// 	};
// 	return (
// 		<form onSubmit={submitRecipe} className='w-full max-w-lg mx-auto'>
// 			<div className='flex gap-4 justify-center items-center mb-6'>
// 				<label htmlFor='name' className='w-1/4'>
// 					Name:
// 				</label>
// 				<input
// 					id='name'
// 					name='name'
// 					placeholder='Banana Bread'
// 					className='w-3/4'
// 				></input>
// 			</div>
// 			<div className='flex gap-4 justify-center items-center mb-6'>
// 				<label htmlFor='steps' className='w-1/4'>
// 					Steps:
// 				</label>
// 				<textarea
// 					id='steps'
// 					name='steps'
// 					placeholder='1. Eat banana bread'
// 					className='w-3/4'
// 				></textarea>
// 			</div>
// 			{[...Array(ingredientAmount).keys()].map((index) => {
// 				return (
// 					<fieldset
// 						className='flex gap-4 justify-center items-center mb-6'
// 						key={index}
// 					>
// 						<label htmlFor={`name-${index}`} className='w-1/4'>
// 							Ingredient Name:
// 						</label>
// 						<input
// 							id={`name-${index}`}
// 							name={`name-${index}`}
// 							placeholder='Bananas'
// 							className='w-1/4'
// 						></input>
// 						<label htmlFor={`amount-${index}`} className='w-1/8'>
// 							Ingredient Amount:
// 						</label>
// 						<input
// 							id={`amount-${index}`}
// 							type='number'
// 							name={`amount-${index}`}
// 							placeholder='6'
// 							className='w-1/8'
// 						></input>
// 						<label htmlFor={`units-${index}`} className='w-1/8'>
// 							Ingredient Units:
// 						</label>
// 						<input
// 							id={`units-${index}`}
// 							name={`units-${index}`}
// 							placeholder='bunches'
// 							className='w-1/8'
// 						></input>
// 					</fieldset>
// 				);
// 			})}
// 			<button
// 				className='group underline rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30'
// 				onClick={() => setIngredientAmount((amount) => amount + 1)}
// 			>
// 				Add Ingredient
// 			</button>
// 			<input
// 				className='group underline rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30'
// 				type='submit'
// 			/>
// 		</form>
// 	);
// }

// export default function RecipeForm({ onSubmit }) {
// 	const [ingredientAmount, setIngredientAmount] = useState(1);

// 	const submitRecipe = (event) => {
// 		event.preventDefault();
// 		const formData = new FormData(event.target);
// 		console.log(Object.fromEntries(formData));

// 		onSubmit({
// 			name: formData.get('name'),
// 			steps: formData.get('steps'),
// 			ingredients: [...Array(ingredientAmount).keys()].map((index) => {
// 				return {
// 					name: formData.get(`name-${index}`),
// 					amount: formData.get(`amount-${index}`),
// 					units: formData.get(`units-${index}`),
// 				};
// 			}),
// 		});
// 		event.target.reset();
// 	};
// 	return (
// 		<form onSubmit={submitRecipe} className='w-full max-w-lg mx-auto'>
// 			<div className='flex gap-4 justify-center items-center mb-6'>
// 				<label htmlFor='name' className='w-1/4'>
// 					Name:
// 				</label>
// 				<input
// 					id='name'
// 					name='name'
// 					placeholder='Banana Bread'
// 					className='w-3/4'
// 				></input>
// 			</div>
// 			<div className='flex gap-4 justify-center items-center mb-6'>
// 				<label htmlFor='steps' className='w-1/4'>
// 					Steps:
// 				</label>
// 				<textarea
// 					id='steps'
// 					name='steps'
// 					placeholder='1. Eat banana bread'
// 					className='w-3/4'
// 				></textarea>
// 			</div>
// 			{[...Array(ingredientAmount).keys()].map((index) => {
// 				return (
// 					<fieldset
// 						className='flex gap-4 justify-center items-center mb-6'
// 						key={index}
// 					>
// 						<label htmlFor={`name-${index}`} className='w-1/4'>
// 							Ingredient Name:
// 						</label>
// 						<input
// 							id={`name-${index}`}
// 							name={`name-${index}`}
// 							placeholder='Bananas'
// 							className='w-1/4'
// 						></input>
// 						<label htmlFor={`amount-${index}`} className='w-1/8'>
// 							Ingredient Amount:
// 						</label>
// 						<input
// 							id={`amount-${index}`}
// 							type='number'
// 							name={`amount-${index}`}
// 							placeholder='6'
// 							className='w-1/8'
// 						></input>
// 						<label htmlFor={`units-${index}`} className='w-1/8'>
// 							Ingredient Units:
// 						</label>
// 						<input
// 							id={`units-${index}`}
// 							name={`units-${index}`}
// 							placeholder='bunches'
// 							className='w-1/8'
// 						></input>
// 					</fieldset>
// 				);
// 			})}
// 			<button
// 				className='group underline rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30'
// 				onClick={() => setIngredientAmount((amount) => amount + 1)}
// 			>
// 				Add Ingredient
// 			</button>
// 			<input
// 				className='group underline rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30'
// 				type='submit'
// 			/>
// 		</form>
// 	);
// }

export default function RecipeForm({ onSubmit }) {
	const [ingredientAmount, setIngredientAmount] = useState(1);

	const submitRecipe = (event) => {
		event.preventDefault();
		const formData = new FormData(event.target);
		console.log(Object.fromEntries(formData));

		onSubmit({
			name: formData.get('name'),
			steps: formData.get('steps'),
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
				className='px-4 py-1 border border-transparent text-base font-medium rounded-sm text-white bg-gray-600 hover:bg-gray-700 cursor-pointer mr-4 mt-1'
				onClick={() => setIngredientAmount((amount) => amount + 1)}
			>
				Add Ingredient
			</button>
			<input
				className='px-4 py-1 border border-transparent text-base font-medium rounded-sm text-white bg-blue-600 hover:bg-blue-700 cursor-pointer mt-1'
				type='submit'
			/>
		</form>
	);
}
