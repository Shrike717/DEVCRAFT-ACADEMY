'use client';
import { SessionProvider } from 'next-auth/react';

export default function App({ session, children }) {
	console.log('[Session Provider] session: ', session);
	return <SessionProvider session={session}>{children}</SessionProvider>;
}
