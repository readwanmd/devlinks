const User = require('../models/User');
const Links = require('../models/Links');
const express = require('express');
const { check } = require('express-validator');
const userController = require('../controllers/userController');
const { authMiddleware } = require('../middlware/authMiddleware');

const router = express.Router();

router.post(
	'/auth/register',
	[
		check('firstName', 'firstName is required').not().isEmpty(),
		check('lastName', 'lastName is required').not().isEmpty(),
		check('username', 'Username is required').not().isEmpty(),
		check('email', 'Please include a valid email').isEmail(),
		check('password', 'Password is required').isLength({ min: 6 }),
	],
	userController.register
);

router.post(
	'/auth/login',
	[
		check('email', 'Please include a valid email').isEmail(),
		check('password', 'Password is required').exists(),
	],
	userController.login
);

router.patch('/users/:id', authMiddleware, userController.updateUser);

// Public route to get user info and links by username
router.get('/user/:username', async (req, res) => {
	const { username } = req.params;

	// Find the user and user's link by username
	try {
		const user = await User.findOne({ username });

		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}

		const userLinks = await Links.findOne({ user: user._id });

		res.status(200).json({
			firstName: user.firstName,
			lastName: user.lastName,
			email: user.email,
			avatar: user.avatar,
			links: userLinks ? userLinks.links : [],
		});
	} catch (error) {
		console.error('Error fetching user data:', error);
		res.status(500).json({ message: 'Server error' });
	}
});

module.exports = router;
