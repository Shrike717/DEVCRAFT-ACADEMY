'use client';
import { signOut } from 'next-auth/react';
import { deleteSession } from '../lib/api';

const LogoutButton = () => {
	return (
		<button
			onClick={() => {
				signOut();
				deleteSession();
			}}
		>
			Sign out
		</button>
	);
};

export default LogoutButton;
