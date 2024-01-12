'use client';
import { useEffect, useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { setSession } from '../lib/storage';
import { getSession } from 'next-auth/react'; // Holt die Session nach dem anmelden.
import Link from 'next/link';

function LoginForm() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const router = useRouter();
	const { data: session } = useSession();
	const [isClient, setIsClient] = useState(false);

	// console.log(name, email, password, confirmPassword);

	const handleSubmit = async (e) => {
		e.preventDefault();

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
		<>
			<form
				onSubmit={handleSubmit}
				className='max-w-md mx-auto bg-slate-50 rounded-md shadow-md overflow-hidden md:max-w-2xl mt-16 p-8'
			>
				<div className='flex flex-col gap-4'>
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
					<button
						type='submit'
						className='w-full sm:w-auto flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-sm text-white bg-blue-600 hover:bg-blue-700'
					>
						Log In
					</button>
					<div className='mx-auto -my-0.5 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400'>
						or
					</div>
					<div className='flex flex-col text-center'>
						<button
							className='w-full sm:w-auto flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-sm text-white bg-gray-600 hover:bg-gray-700'
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
					<p className='text-center text-slate-800 text-sm'>
						Don't have an account?
						<Link href={'/signup'}>
							<span className='text-slate-800 underline ml-2'>
								SignUp
							</span>
						</Link>
					</p>
				</div>
			</form>
		</>
	);
}

export default LoginForm;
