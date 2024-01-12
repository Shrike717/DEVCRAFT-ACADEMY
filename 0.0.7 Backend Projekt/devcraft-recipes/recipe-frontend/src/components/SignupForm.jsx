'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

function SignupForm() {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [isClient, setIsClient] = useState(false);

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

	// Die Komponente soll nur als Clientkomponente gerendert werden:
	useEffect(() => {
		setIsClient(true);
	}, []);

	if (!isClient) {
		return null;
	}

	return (
		<>
			<form
				onSubmit={handleSubmit}
				className='max-w-md mx-auto bg-slate-50 rounded-md shadow-md overflow-hidden md:max-w-2xl mt-16 p-8'
			>
				<div className='flex flex-col gap-4'>
					<label className='flex flex-col'>
						Name:
						<input
							type='text'
							value={name}
							onChange={(e) => setName(e.target.value)}
							placeholder='Your Name:'
							className='mt-1 block w-full rounded-sm border-gray-300 shadow-sm'
						/>
					</label>
					<label className='flex flex-col'>
						Email:
						<input
							type='email'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							placeholder='Your Email:'
							className='mt-1 block w-full rounded-sm border-gray-300 shadow-sm'
						/>
					</label>
					<label className='flex flex-col'>
						Password:
						<input
							type='password'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							placeholder='Your Password:'
							className='mt-1 block w-full rounded-sm border-gray-300 shadow-sm'
						/>
					</label>
					<label className='flex flex-col'>
						Confirm Password:
						<input
							type='password'
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
							placeholder='Confirm Password:'
							className='mt-1 block w-full rounded-sm border-gray-300 shadow-sm'
						/>
					</label>
					<button
						type='submit'
						className='w-full sm:w-auto flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-sm text-white bg-blue-600 hover:bg-blue-700'
					>
						Sign Up
					</button>
				</div>
				<p className='text-center text-slate-800 text-sm mt-4'>
					Already have an account?
					<Link href={'/login'}>
						<span className='text-slate-800 underline ml-2'>
							LogIn
						</span>
					</Link>
				</p>
			</form>
		</>
	);
}

export default SignupForm;
