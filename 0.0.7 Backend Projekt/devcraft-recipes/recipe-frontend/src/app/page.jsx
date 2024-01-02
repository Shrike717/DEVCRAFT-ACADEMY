import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions } from '../lib/authOptions';

const Home = async () => {
	// Die Server Session holen:
	const session = await getServerSession(authOptions);
	console.log('[Home] session: ', session);

	return (
		<>
			{session && <Link href={'/recipes'}>Add Recipe</Link>}
			<h1>Home</h1>
		</>
	);
};

export default Home;
