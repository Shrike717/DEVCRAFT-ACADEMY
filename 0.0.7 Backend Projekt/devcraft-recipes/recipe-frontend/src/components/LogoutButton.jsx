'use client';
import { signOut } from 'next-auth/react';
import { deleteSession } from '../lib/storage';

const LogoutButton = () => {
	return (
		<button
			onClick={() => {
				signOut();
				deleteSession();
			}}
		>
			SignOut
		</button>
	);
};

export default LogoutButton;
