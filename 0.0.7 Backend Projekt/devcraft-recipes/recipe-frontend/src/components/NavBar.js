// 'use client';
import Link from 'next/link';
import LogoutButton from './LogoutButton';
import { getServerSession } from 'next-auth';
import { authOptions } from '../lib/authOptions';
import Image from 'next/image';

const NavBar = async () => {
	// Die Server Session holen:
	const session = await getServerSession(authOptions);
	console.log('[Navbar] session: ', session);
	if (session) {
		return (
			<nav className='flex flex-row justify-between h-[60px] w-1/2 mb-32 items-center'>
				<Link href={'/'}>Home</Link>
				<div className={'flex flex-row gap-8 items-center'}>
					<div className='flex flex-row gap-2 justify-center items-center'>
						<Image
							className={'w-[30px] h-[30px] rounded-[50%] '}
							alt={'Profilbild'}
							src={session.user.image}
							width={30}
							height={30}
						/>
						<span>{session.user.name}</span>
					</div>
					<LogoutButton />
				</div>
			</nav>
		);
	}
	return (
		<nav className='flex flex-row justify-between h-[60px] w-1/2 mb-32 items-center'>
			<Link href={'/'}>Home</Link>
			<div className={'flex flex-row gap-8 items-center'}>
				<Link href={'/signup'}>SignUp</Link>
				<Link href={'/login'}>LogIn</Link>
			</div>
		</nav>
	);
};

export default NavBar;