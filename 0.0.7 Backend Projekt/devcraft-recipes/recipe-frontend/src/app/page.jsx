import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions } from '../lib/authOptions';
import axios from 'axios';

const Home = async () => {
	// Die Server Session holen:
	const session = await getServerSession(authOptions);
	console.log('[Home] session: ', session);

	// // Making axios test request to backend to check if the cookie is set:
	// const response = await axios.get('http://localhost:5000/set-cookie');
	// console.log('[Home] response.headers: ', response.headers);

	return (
		<>
			{session && <Link href={'/recipes'}>Add Recipe</Link>}
			<h1>Home</h1>
		</>
	);
};

export default Home;
