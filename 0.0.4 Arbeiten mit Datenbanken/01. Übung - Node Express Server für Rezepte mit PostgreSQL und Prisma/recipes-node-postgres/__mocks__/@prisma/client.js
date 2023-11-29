// Wir definieren einen simulierten Benutzer ("mockUser") mit einer ID, einem Benutzernamen und einer E-Mail.
const mockUser = {
	id: 1,
	username: 'Testuser',
	email: 'testuser@example.com',
};

// Wir erstellen ein simuliertes Prisma-Objekt ("mockPrisma"), das die Methoden des Prisma-Clients nachahmt.
const mockPrisma = {
	user: {
		// Die "create"-Methode erstellt einen neuen Benutzer und gibt eine Promise zurück, die zu einem Benutzerobjekt aufgelöst wird.
		create: jest.fn((data) =>
			Promise.resolve({ id: Date.now(), ...data.data })
		),
		// Die "findMany"-Methode gibt eine Promise zurück, die zu einem Array mit dem simulierten Benutzer aufgelöst wird.
		findMany: jest.fn(async () => [mockUser]),
		// Die "findUnique"-Methode gibt eine Promise zurück, die zu dem simulierten Benutzer aufgelöst wird, wenn die ID 1 ist, und sonst zu null.
		findUnique: jest.fn(async (data) => {
			if (data.where.id !== 1) {
				return null;
			}
			return mockUser;
		}),
		// Die "findFirst"-Methode gibt eine Promise zurück, die zu dem simulierten Benutzer aufgelöst wird, wenn der Benutzername oder die E-Mail übereinstimmen, und sonst zu null.
		findFirst: jest.fn(async (data) => {
			if (
				data.where.OR.some(
					(condition) =>
						condition.username !== mockUser.username ||
						condition.email !== mockUser.email
				)
			) {
				return null;
			}
			return mockUser;
		}),
		// Die "update"-Methode aktualisiert einen Benutzer und gibt eine Promise zurück, die zu dem aktualisierten Benutzer aufgelöst wird.
		update: jest.fn(async (data) => ({ ...mockUser, ...data.data })),
		// Die "delete"-Methode löscht einen Benutzer und gibt eine Promise zurück, die zu dem simulierten Benutzer aufgelöst wird, wenn die ID 1 ist, und sonst zu null.
		delete: jest.fn(async (data) => {
			if (data.where.id !== 1) {
				return null;
			}
			return mockUser;
		}),
	},
};

// Wir exportieren eine Funktion, die eine neue Instanz des simulierten Prisma-Clients erstellt.
module.exports = {
	PrismaClient: jest.fn(() => mockPrisma),
};
