'use client';
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

function SignupForm() {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	// console.log(name, email, password, confirmPassword);

	const router = useRouter();

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (password !== confirmPassword) {
			// Zeigen Sie eine Fehlermeldung an
			console.log('Passwords do not match');
			return;
		}
		// Die Custom Credentials werden zum Post Route Handler des Users geschickt. Von dort erfolgt der Fetch Call zum Express Server
		const response = await axios.post('/api/user', {
			name: name,
			email: email,
			password: password,
		});
		console.log('[SignupForm] handleSubmit response.data: ', response.data);

		if (response.data.status === 201) {
			// Weiterleiten zum Dashboard oder einer anderen Seite
			router.push('/login');
		} else {
			// Fehlermeldung anzeigen
			console.log(
				'[SignupForm] handleSubmit response.data: ',
				response.data
			);
		}
	};

	return (
		<form
			onSubmit={handleSubmit}
			className='border-2 border-gray-300 px-10 py-5 bg-gray-100'
		>
			<div className='flex flex-col gap-2'>
				<label className='flex flex-col'>
					Name:
					<input
						type='text'
						value={name}
						onChange={(e) => setName(e.target.value)}
						placeholder='Your Name:'
						// required
					/>
				</label>
				<label className='flex flex-col'>
					Email:
					<input
						type='email'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder='Your Email:'
						// required
					/>
				</label>
				<label className='flex flex-col'>
					Password:
					<input
						type='password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						placeholder='Your Password:'
						// required
					/>
				</label>
				<label className='flex flex-col'>
					Confirm Password:
					<input
						type='password'
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						placeholder='Confirm Password:'
						// required
					/>
				</label>
				<button
					type='submit'
					className='group underline rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30'
				>
					Sign Up
				</button>
			</div>
		</form>
	);
}

export default SignupForm;
