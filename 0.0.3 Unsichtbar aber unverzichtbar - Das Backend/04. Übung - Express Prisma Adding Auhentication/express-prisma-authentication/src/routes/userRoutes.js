const express = require('express');
const { validateUser } = require('../../middleware/validation');

const {
	getAllUsers,
	getUserById,
	createUser,
	updateUser,
	deleteUser,
} = require('../controllers/userController');

const router = express.Router();

router.get('/', getAllUsers);
router.get('/:userId', getUserById);
// router.post('/', validateUser, createUser); // Diese Route wird durch die Route /auth/signup ersetzt.
router.put('/:userId', validateUser, updateUser);
router.delete('/:userId', deleteUser);

module.exports = router;
