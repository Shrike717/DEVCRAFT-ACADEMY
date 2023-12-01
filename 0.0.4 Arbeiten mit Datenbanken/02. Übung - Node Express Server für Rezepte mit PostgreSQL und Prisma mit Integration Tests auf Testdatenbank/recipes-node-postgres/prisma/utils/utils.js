exports.generateDatabaseURL = function (schemaId) {
	// Replace with your logic to generate a database URL
	const user = 'danielbauer';
	const password = 'danielbauer';
	return `postgresql://${user}:${password}@localhost:5432/recipes_node_postgres_test?schema=${schemaId}`;
};
