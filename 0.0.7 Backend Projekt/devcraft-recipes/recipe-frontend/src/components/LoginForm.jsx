'use client';
import { useEffect, useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

function LoginForm() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const router = useRouter();
	const { data: session } = useSession();
	// console.log('[LoginForm] session: ', session);

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
			router.refresh(); // Refresh der Hmepage:
			router.push('/'); // Weiterleitung auf die Homepage:
		}
	};

	useEffect(() => {
		if (session) {
			router.push('/');
		}
	}, [session]);

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
