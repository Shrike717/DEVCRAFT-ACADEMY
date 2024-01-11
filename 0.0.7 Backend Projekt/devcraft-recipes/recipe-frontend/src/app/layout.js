import App from '../components/App';
import './globals.css';
import { Inter } from 'next/font/google';
import NavBar from '../components/NavBar';
import SessionProvider from '../components/SessionProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
	title: 'Create Next App',
	description: 'Generated by create next app',
};

export default function RootLayout({ children }) {
	return (
		<html lang='en'>
			<body className={inter.className}>
				<SessionProvider>
					<main className='flex flex-col items-center justify-between p-8'>
						<NavBar />
						{children}
					</main>
				</SessionProvider>
			</body>
		</html>
	);
}
