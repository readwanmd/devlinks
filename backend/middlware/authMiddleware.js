const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;

exports.authMiddleware = async (req, res, next) => {
	const authHeader = req.header('Authorization');
	if (!authHeader || !authHeader.startsWith('Bearer ')) {
		return res.status(401).json({ message: 'No token, authorization denied' });
	}

	const token = authHeader.split(' ')[1];

	if (!token) {
		return res.status(401).json({ message: 'Authorization token missing' });
	}

	try {
		const decoded = jwt.verify(token, JWT_SECRET);
		req.user = decoded.id;
		next();
	} catch (error) {
		console.error('Invalid token', error);
		return res.status(401).json({ message: 'Invalid token' });
	}
};
