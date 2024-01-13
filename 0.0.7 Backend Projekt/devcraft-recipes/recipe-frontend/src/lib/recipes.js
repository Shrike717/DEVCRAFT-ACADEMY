// Hier werden alle Calls zum externen Express back and gemacht, die mit  Recipes zu tun haben

import axios from 'axios';

export const getRecipes = async () => {
	try {
		const response = await axios.get('http://localhost:5000/recipes');

		// Überprüfen des Statuscode und werfen des Errors, wenn etwas schief gelaufen ist
		if (response.status !== 200) {
			throw new Error(
				`Error: ${response.status} ${response.data.message}`
			);
		}

		// console.log(
		// 	'[getRecipes] API response: ',
		// 	JSON.stringify(response.data, null, 2)
		// );

		return response.data;
	} catch (error) {
		console.error(error);
		return { error: error.response.data.message };
	}
};