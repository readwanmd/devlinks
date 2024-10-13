import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';

const NavForPreview = () => {
	const [username, setUsername] = useState('');

	useEffect(() => {
		const userdata = JSON.parse(localStorage.getItem('user'));
		if (userdata && userdata.user) {
			setUsername(userdata.user.username);
		}
	}, []);

	const handleShareLink = async () => {
		const currentDomain = window.location.origin;
		const shareUrl = `${currentDomain}/${username}`;

		try {
			await navigator.clipboard.writeText(shareUrl);

			toast('Link copied to clipboard!', {
				duration: 1500,
			});
		} catch (err) {
			console.error('Failed to copy link: ', err);
			alert('Failed to copy link. Please try again.');
		}
	};

	return (
		<nav className="container bg-white py-4 rounded-md flex justify-between">
			<NavLink
				to="/links"
				className="border border-brandColor px-4 py-2 rounded text-brandColor font-semibold"
			>
				Back to Editor
			</NavLink>
			<button
				onClick={handleShareLink}
				className="border bg-brandColor px-4 py-2 rounded text-white font-semibold"
			>
				Share Link
			</button>
		</nav>
	);
};

export default NavForPreview;
