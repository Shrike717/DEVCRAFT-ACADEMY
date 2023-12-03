// Diese Loks zeigen, ob der Server auf die Dev-Datenbank oder auf die Test-Datenbank zugreift.
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('DATABASE_URL:', process.env.DATABASE_URL);

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Import Prisma Client
const { PrismaClient } = require('../../prisma/src/models/generated/client');
const prisma = new PrismaClient();

// ********** Auth **********

exports.signup = async (name, email, password) => {
	const existingUser = await prisma.user.findFirst({
		where: {
			OR: [{ name: name }, { email: email }],
		},
	});
	if (existingUser) {
		return null;
	}

	const salt = bcrypt.genSaltSync(10);
	const hashedPassword = bcrypt.hashSync(password, salt);

	const newUser = await prisma.user.create({
		data: {
			name,
			email,
			password: hashedPassword,
			salt,
		},
		select: {
			id: true,
			name: true,
			email: true,
			// password und salt dürfen nicht zurückgegeben werden.
			// Wir müssen das hier für unsere Integrations Test setzen
		},
	});

	const token = jwt.sign({ id: newUser.id }, process.env.SECRET_KEY);

	return { user: newUser, token };
};

exports.login = async (email, password) => {
	const user = await prisma.user.findFirst({
		where: { email: email },
	});
	if (!user) {
		return null;
	}

	const isPasswordValid = bcrypt.compareSync(password, user.password);
	if (!isPasswordValid) {
		return null;
	}

	const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY);

	return { user, token };
};

// ********** CRUD **********

exports.getAllUsers = async () => {
	return prisma.user.findMany({
		select: {
			id: true,
			name: true,
			email: true,
			// password und salt dürfen nicht zurückgegeben werden.
			// Wir müssen das hier für unsere Integrations Test setzen
		},
	});
};

exports.getUserById = async (userId) => {
	const existingUser = await prisma.user.findFirst({
		where: { id: userId },
	});
	if (!existingUser) {
		return null;
	}
	return prisma.user.findUnique({
		where: {
			id: userId,
		},
		select: {
			id: true,
			name: true,
			email: true,
			// password und salt dürfen nicht zurückgegeben werden.
			// Wir müssen das hier für unsere Integrations Test setzen
		},
	});
};

// ***** Diese Funktion wurde durch die Funktion signup ersetzt. *****

// exports.createUser = async (name, email) => {
// 	const existingUser = await prisma.user.findFirst({
// 		where: {
// 			OR: [{ name: name }, { email: email }],
// 		},
// 	});
// 	if (existingUser) {
// 		return null;
// 	}

// 	return prisma.user.create({
// 		data: {
// 			name,
// 			email,

// 		},
// 	});
// };

exports.updateUser = async (userId, newData) => {
	const existingUser = await prisma.user.findFirst({
		where: { id: userId },
	});
	if (!existingUser) {
		return null;
	}
	return prisma.user.update({
		where: { id: userId },
		data: newData,
		select: {
			id: true,
			name: true,
			email: true,
			// password und salt dürfen nicht zurückgegeben werden.
			// Wir müssen das hier für unsere Integrations Test setzen
		},
	});
};

exports.deleteUser = async (userId) => {
	const existingUser = await prisma.user.findFirst({
		where: { id: userId },
	});
	if (!existingUser) {
		return null;
	}
	return prisma.user.delete({
		where: { id: userId },
		select: {
			id: true,
			name: true,
			email: true,
			// password und salt dürfen nicht zurückgegeben werden.
			// Wir müssen das hier für unsere Integrations Test setzen
		},
	});
};
