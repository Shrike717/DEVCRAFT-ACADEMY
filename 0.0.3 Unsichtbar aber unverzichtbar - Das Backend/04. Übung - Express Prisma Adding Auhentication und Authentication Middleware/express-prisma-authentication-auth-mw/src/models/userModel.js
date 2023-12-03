// Diese Loks zeigen, ob der Server auf die Dev-Datenbank oder auf die Test-Datenbank zugreift.
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('DATABASE_URL:', process.env.DATABASE_URL);

// Import Prisma Client
const { PrismaClient } = require('../../prisma/src/models/generated/client');
const prisma = new PrismaClient();

exports.getAllUsers = async () => {
	return prisma.user.findMany();
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
	});
};

exports.createUser = async (name, email) => {
	const existingUser = await prisma.user.findFirst({
		where: {
			OR: [{ name: name }, { email: email }],
		},
	});
	if (existingUser) {
		return null;
	}

	return prisma.user.create({
		data: {
			name,
			email,
		},
	});
};

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
	});
};
