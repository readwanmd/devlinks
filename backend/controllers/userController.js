const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;

// Generate JWT Token
const generateToken = (user) => {
	return jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '24h' });
};

// Register a new user
exports.register = async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	const { firstName, lastName, username, email, password, avatar } = req.body;

	try {
		// Check if username or email exists
		let userByEmail = await User.findOne({ email });
		let userByUsername = await User.findOne({ username });

		if (userByEmail) {
			return res.status(400).json({ message: 'Email already exists' });
		}

		if (userByUsername) {
			return res.status(400).json({ message: 'Username already exists' });
		}

		// Create new user if email and username are not taken
		const user = new User({
			firstName,
			lastName,
			username,
			email,
			password,
			avatar,
		});

		// Hash password before saving
		const salt = await bcrypt.genSalt(10);
		user.password = await bcrypt.hash(password, salt);

		await user.save();

		// Generate token
		const token = generateToken(user);

		res
			.status(201)
			.json({ message: 'User registered successfully', token, user });
	} catch (error) {
		console.error('Register error:', error);
		res.status(500).json({ message: 'Server error', error: error.message });
	}
};

const Links = require('../models/Links');

exports.login = async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	const { email, password } = req.body;

	try {
		const user = await User.findOne({ email });

		if (!user) {
			return res.status(400).json({ message: 'Invalid Credentials' });
		}

		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return res.status(400).json({ message: 'Invalid Credentials' });
		}

		// Generate token
		const token = generateToken(user);

		// Get user's links
		const userLinks = await Links.findOne({ user: user._id });

		res.status(200).json({
			message: 'Login successful',
			token,
			user,
			links: userLinks ? userLinks.links : [], // Include links or an empty array if no links found
		});
	} catch (error) {
		console.error('Login error:', error);
		res.status(500).json({ message: 'Server error' });
	}
};

// Update user profile - only the logged in user can update his profile
exports.updateUser = async (req, res) => {
	try {
		// Ensure the logged in user is the same as the user being updated
		if (req.user !== req.params.id) {
			return res
				.status(403)
				.json({ message: 'Unauthorized to update this profile' });
		}

		const updateData = { ...req.body };
		if (updateData.email) {
			delete updateData.email; // Prevent email updates
		}

		// If username is being updated, check for availability
		if (updateData.username) {
			const existingUser = await User.findOne({
				username: updateData.username,
			});
			if (existingUser) {
				return res.status(400).json({ message: 'Username already exists' });
			}
		}

		// Check if password is being updated
		if (updateData.password) {
			if (!updateData.currentPassword) {
				return res.status(400).json({
					message: 'Current password is required to update your password.',
				});
			}

			// Find the user by ID
			const user = await User.findById(req.params.id);

			// Compare the current password with the stored password
			const isMatch = await bcrypt.compare(
				updateData.currentPassword,
				user.password
			);
			if (!isMatch) {
				return res.status(400).json({
					message: 'Current password is incorrect. Password not updated.',
				});
			}

			// Hash the new password
			if (updateData.password.length < 6) {
				return res.status(400).json({
					message: 'New password must be at least 6 characters long.',
				});
			}
			const salt = await bcrypt.genSalt(10);
			updateData.password = await bcrypt.hash(updateData.password, salt);
		}

		// Find the user by ID and update information
		const user = await User.findByIdAndUpdate(req.params.id, updateData, {
			new: true,
			runValidators: true,
		});

		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}

		res.status(200).json({ message: 'User updated successfully', user });
	} catch (error) {
		console.error('Update error:', error);
		res.status(500).json({ message: 'Server error', error: error.message });
	}
};

// Delete user's profile only the logged in user can delete his profile
exports.deleteUser = async (req, res) => {
	try {
		// Check if the user is deleting their own profile
		const user = await User.findById(req.user);
		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}

		await user.remove();
		res.status(200).json({ message: 'User deleted successfully' });
	} catch (error) {
		console.error('Delete error:', error);
		res.status(500).json({ message: 'Server error', error: error.message });
	}
};
