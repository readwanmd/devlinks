const checkLinkOwnership = async (req, res, next) => {
	try {
		const links = await Links.findById(req.params.id);
		if (!links) {
			return res.status(404).json({ message: 'Links not found' });
		}
		// Check if the user owns the links document
		if (links.user.toString() !== req.user) {
			return res
				.status(403)
				.json({ message: 'Not authorized to access these links' });
		}
		next();
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

module.exports = checkLinkOwnership;
