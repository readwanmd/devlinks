const Links = require('../models/Links');

// Create or update links for the authenticated user
const createOrUpdateLinks = async (req, res) => {
	const { links } = req.body;

	try {
		let userLinks = await Links.findOne({ user: req.user });

		if (userLinks) {
			// Update existing links or add new ones
			links.forEach((newLink) => {
				const existingLinkIndex = userLinks.links.findIndex(
					(link) => link.platform === newLink.platform
				);

				if (existingLinkIndex !== -1) {
					// Update the URL of the existing link
					userLinks.links[existingLinkIndex].url = newLink.url;
				} else {
					// Add new link if platform doesn't exist
					userLinks.links.push(newLink);
				}
			});

			userLinks = await userLinks.save();
			return res.status(200).json(userLinks);
		} else {
			// If no document exists, create a new one
			const newLinks = new Links({
				user: req.user,
				links: links,
			});
			const savedLinks = await newLinks.save();
			return res.status(201).json(savedLinks);
		}
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

// Get the authenticated user's links
const getUserLinks = async (req, res) => {
	try {
		const userLinks = await Links.findOne({ user: req.user });
		if (!userLinks) {
			return res.status(404).json({ message: 'No links found for this user' });
		}
		res.json(userLinks);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

// Update a specific link in the authenticated user's links
const updateLinks = async (req, res) => {
	const { links } = req.body;

	try {
		if (!Array.isArray(links)) {
			return res
				.status(400)
				.json({ message: 'Links should be an array of objects' });
		}

		// Find the user's links document
		let userLinks = await Links.findOne({ user: req.user });

		if (!userLinks) {
			return res
				.status(404)
				.json({ message: 'No links document found for this user' });
		}

		// Iterate through the provided links and update or add them as needed
		links.forEach((newLink) => {
			const existingLinkIndex = userLinks.links.findIndex(
				(link) => link.platform === newLink.platform
			);

			if (existingLinkIndex !== -1) {
				// If the platform exists, update the URL
				userLinks.links[existingLinkIndex].url = newLink.url;
			} else {
				// If the platform doesn't exist, add it as a new link
				userLinks.links.push(newLink);
			}
		});

		const updatedLinks = await userLinks.save();
		res.json(updatedLinks);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

// Delete a specific link in the authenticated user's links by platform
const deleteLink = async (req, res) => {
	const { platform } = req.params;

	try {
		let userLinks = await Links.findOne({ user: req.user });

		if (!userLinks) {
			return res
				.status(404)
				.json({ message: 'No links document found for this user' });
		}

		// Filter out the link with the specified platform
		userLinks.links = userLinks.links.filter(
			(link) => link.platform !== platform
		);

		const updatedLinks = await userLinks.save();
		res.json({
			message: 'Link deleted successfully',
			links: updatedLinks.links,
		});
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

module.exports = {
	createOrUpdateLinks,
	getUserLinks,
	updateLinks,
	deleteLink,
};
