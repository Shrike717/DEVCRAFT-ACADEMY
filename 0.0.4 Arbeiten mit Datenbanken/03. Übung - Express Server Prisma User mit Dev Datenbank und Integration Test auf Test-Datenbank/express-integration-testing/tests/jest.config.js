module.exports = {
	// ...
	testEnvironment: 'node',
	setupFiles: ['dotenv/config'],
	setupFilesAfterEnv: ['./setEnvVars.js'],
	// ...
};
