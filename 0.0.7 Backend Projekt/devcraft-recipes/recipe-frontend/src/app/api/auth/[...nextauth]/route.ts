// ******* Reiner Github Proider funktioniert ********
import NextAuth from 'next-auth/next';
import GithubProvider from 'next-auth/providers/github';
import { authOptions } from '../../../../lib/authOptions';

export const authHandler = NextAuth(authOptions);

export { authHandler as GET, authHandler as POST };
