const { PrismaClient } = require('./src/models/generated/client');
const prisma = new PrismaClient();
const seedData = require('./seedData.json');

async function main() {
	for (const userData of seedData.users) {
		const user = await prisma.user.create({
			data: {
				name: userData.name,
				email: userData.email,
			},
		});
	}
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
