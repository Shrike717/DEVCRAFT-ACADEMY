'use client';
import { signOut } from 'next-auth/react';
import { deleteSession } from '../lib/storage';

const LogoutButton = ({ className }) => {
	return (
		<button
			className={`flex items-center justify-center px-4 py-1 border border-transparent text-base font-medium rounded-sm text-white bg-red-500 hover:bg-red-600 ${className}`}
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
