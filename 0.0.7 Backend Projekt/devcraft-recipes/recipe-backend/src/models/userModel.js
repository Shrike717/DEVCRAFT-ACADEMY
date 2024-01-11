const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
const saltRounds = 10;

console.log('NODE_ENV:', process.env.NODE_ENV);

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

signupUserModel = async (name, email, password) => {
	const existingUser = await prisma.user.findFirst({
		where: {
			OR: [{ name: name }, { email: email }],
		},
	});
	if (existingUser) {
		return null;
	}

	// Hashe das Passwort, bevor es in der Datenbank gespeichert wird
	const hashedPassword = await bcrypt.hash(password, saltRounds);

	return prisma.user.create({
		data: {
			name,
			email,
			password: hashedPassword,
		},
	});
};

loginUserModel = async (email, password) => {
	// console.log('[loginUserModel] function called');
	const user = await prisma.user.findFirst({
		where: { email: email },
	});
	console.log('[loginUserModel] user after prisma.User.findFirst: ', user);
	if (!user) {
		return null;
	}

	const isPasswordValid = bcrypt.compareSync(password, user.password);
	console.log(
		'[loginUserModel] isPasswordValid after bcrypt.compareSync: ',
		isPasswordValid
	);
	if (!isPasswordValid) {
		return null;
	}

	return { user };
};

module.exports = { loginUserModel, signupUserModel };
