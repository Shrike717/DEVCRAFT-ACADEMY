// Der useSession Hook ist speziell für den Einsatz auf der Client-Seite konzipiert und sollte nicht auf der Server-Seite verwendet werden.
// Sie verwendet React's Context API, um die Session-Daten über die Komponenten Ihrer Anwendung hinweg verfügbar zu machen.

// Wenn Sie die Session-Daten auf der Server-Seite abrufen möchten, können Sie die getSession Funktion von next-auth verwenden.
// Diese Funktion kann sowohl auf der Client- als auch auf der Server-Seite verwendet werden.
// Sie könnten sie in getServerSideProps oder getInitialProps in Ihrer Seite verwenden, um die Session-Daten abzurufen und sie dann als Prop an Ihre NavBar Komponente weiterzugeben.

import Link from 'next/link';
import LogoutButton from './LogoutButton';
import { getServerSession } from 'next-auth';
import { authOptions } from '../lib/authOptions';
import Image from 'next/image';
import { CookingPot } from 'lucide-react';

const NavBar = async () => {
	// Die Server Session holen:
	const session = await getServerSession(authOptions);
	console.log('[Navbar] session: ', session);
	if (session) {
		return (
			<nav className='flex flex-row justify-between h-[60px] w-full mb-8 items-center bg-slate-50 px-4 shadow-sm'>
				<Link href='/'>
					<div className='flex items-center'>
						<CookingPot
							className='text-green-800'
							strokeWidth={3}
						/>
						{/* <span className='ml-2 font-bold'>Recipes</span> */}
					</div>
				</Link>
				<div className={'flex flex-row gap-2 md:gap-8 items-center'}>
					<div className='flex flex-row gap-2 justify-center items-center'>
						{session.user && session.user.image ? (
							<Image
								className={
									'w-[30px] h-[30px] rounded-[50%] flex-shrink-0'
								}
								alt={'Profilbild'}
								src={session.user.image}
								width={30}
								height={30}
							/>
						) : (
							<span className={'text-xl font-bold'}>
								{session.user && session.user.name[0]}
							</span>
						)}
						<span className={'hidden md:block flex-shrink-0'}>
							{session.user && session.user.name}
						</span>
					</div>
					<LogoutButton className='w-auto flex-shrink-0 flex-grow-0' />
				</div>
			</nav>
		);
	}
	return (
		<nav className='flex flex-row justify-between h-[60px] w-full mb-8 items-center bg-slate-50 px-4 shadow-sm'>
			<Link href='/'>
				<div className='flex items-center'>
					<CookingPot className='text-green-800' strokeWidth={3} />
					{/* <span className='ml-2 font-bold'>Recipes</span> */}
				</div>
			</Link>
			<div className={'flex flex-row gap-2 md:gap-8 items-center'}>
				<Link
					className='w-full sm:w-auto flex items-center justify-center px-4 py-1 border border-transparent text-base font-medium rounded-sm text-white bg-blue-600 hover:bg-blue-700'
					href={'/login'}
				>
					Sign In
				</Link>
			</div>
		</nav>
	);
};

export default NavBar;
