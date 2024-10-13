// routes/links.js
const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middlware/authMiddleware');
const {
	createOrUpdateLinks,
	getUserLinks,
	updateLinks,
	deleteLink,
} = require('../controllers/linkController');

// Create or update links for the authenticated user
router.post('/links', authMiddleware, createOrUpdateLinks);

// Get the authenticated user's links
router.get('/links', authMiddleware, getUserLinks);

// Update user's links
router.put('/links', authMiddleware, updateLinks);

// Delete user's links by platform
router.delete('/links/:platform', authMiddleware, deleteLink);

module.exports = router;
