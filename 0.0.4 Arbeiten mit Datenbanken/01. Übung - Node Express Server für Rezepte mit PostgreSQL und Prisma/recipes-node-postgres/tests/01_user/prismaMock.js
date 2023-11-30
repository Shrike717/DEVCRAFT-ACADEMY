const mockGetAllUsers = jest.fn();
const mockGetUserById = jest.fn();
const mockCreateUser = jest.fn();
const mockUpdateUser = jest.fn();
const mockDeleteUser = jest.fn();

jest.mock('@prisma/client', () => {
	return {
		PrismaClient: jest.fn().mockImplementation(() => {
			return {
				user: {
					findMany: mockGetAllUsers,
					findFirst: mockGetUserById,
					create: mockCreateUser,
					update: mockUpdateUser,
					delete: mockDeleteUser,
				},
			};
		}),
	};
});

module.exports = {
	mockGetAllUsers,
	mockGetUserById,
	mockCreateUser,
	mockUpdateUser,
	mockDeleteUser,
};
