'use client';
import { useEffect, useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { setSession } from '../lib/storage';
import { getSession } from 'next-auth/react'; // Holt die Session nach dem anmelden.
import axios from 'axios';

function LoginForm() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const router = useRouter();
	const { data: session } = useSession();
	const [isClient, setIsClient] = useState(false);

	// console.log(name, email, password, confirmPassword);

	const handleSubmit = async (e) => {
		e.preventDefault();

		// Test Request to backend to check if the cookie is set:
		// const response = await axios.get('http://localhost:5000/set-cookie');
		// console.log('[LoinForm] response.headers: ', response.headers);

		// Hier schicken wir die Custom Credentials an den Credentials Provider:
		const signInData = await signIn('credentials', {
			redirect: false,
			email: email,
			password: password,
		});

		if (signInData?.error) {
			console.error(signInData.error);
		} else {
			// Hier holen wir die aktuelle Session nach dem Anmelden:
			const currentSession = await getSession();
			if (currentSession && currentSession.user) {
				// Und schicken den User und den Express Token in den Local Storage:
				setSession(currentSession.user);
			}

			router.refresh(); // Refresh der Hmepage:
			router.push('/'); // Weiterleitung auf die Homepage:
		}
	};

	useEffect(() => {
		if (session) {
			router.push('/');
		}
	}, [session]);

	// Die Komponente soll nur als Clientkomponente gerendert werden:
	useEffect(() => {
		setIsClient(true);
	}, []);

	if (!isClient) {
		return null;
	}

	return (
		<form
			onSubmit={handleSubmit}
			className='border-2 border-gray-300 px-10 py-5 bg-gray-100'
		>
			<div className='flex flex-col gap-2'>
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
				<button
					type='submit'
					className='group underline rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30'
				>
					Log In
				</button>
				<div className='mx-auto my-1 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400'>
					or
				</div>
				<div className='flex flex-col text-center'>
					<button
						className='group underline rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30'
						onClick={async () =>
							// Hier schicken wir die Github Credentials an den Github Provider:
							await signIn('github', {
								// callbackUrl: 'http://localhost:3000/', // Hier wird die Weiterleitungs-URL angegeben. Homepage
							})
						}
					>
						Sign in with Github
					</button>
				</div>
			</div>
		</form>
	);
}

export default LoginForm;
