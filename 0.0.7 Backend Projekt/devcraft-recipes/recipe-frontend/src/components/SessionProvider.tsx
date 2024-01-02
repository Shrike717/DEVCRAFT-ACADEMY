'use client';
import { SessionProvider as NextAuthSessionProvider } from 'next-auth/react';

interface SessionProviderProps {
	children: React.ReactNode;
}

const SessionProvider: FC<SessionProviderProps> = ({ children }) => {
	return <NextAuthSessionProvider>{children}</NextAuthSessionProvider>;
};

export default SessionProvider;
