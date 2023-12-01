// Import des Prisma Client:
const { prisma } = require('../prisma/index');

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
		include: {
			recipes: {
				include: {
					ingredients: true,
				},
			},
		},
	});
};

exports.createUser = async (username, email) => {
	const existingUser = await prisma.user.findFirst({
		where: {
			OR: [{ username: username }, { email: email }],
		},
	});
	if (existingUser) {
		return null;
	}

	return prisma.user.create({
		data: {
			username,
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
