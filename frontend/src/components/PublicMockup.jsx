import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { api } from '../api';
import { platforms } from '../utils/platforms';

const PublicMockup = () => {
	const [userData, setUserData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const location = useLocation();

	const getPlatformDetails = (platformName) => {
		return platforms.find(
			(platform) =>
				platform.platform.toLowerCase() === platformName.toLowerCase()
		);
	};

	useEffect(() => {
		const fetchUserData = async () => {
			setLoading(true);
			setError(null);
			const username = location.pathname.split('/').pop();
			try {
				const response = await api.get(`/user/${username}`);
				setUserData(response.data);
			} catch (err) {
				setError('Failed to fetch user data. Please try again later.');
				console.error('Error fetching user data:', err);
			} finally {
				setLoading(false);
			}
		};

		fetchUserData();
	}, [location]);

	if (loading) {
		return (
			<div className="bg-white max-w-[300px]">
				<div className="px-4 py-3 flex flex-col items-center gap-3">
					<div className="flex flex-col">
						<div className="flex flex-auto flex-col justify-center items-center ">
							<div className="flex justify-center">
								<div
									className="animate-spin inline-block size-6 border-[3px] border-current border-t-transparent text-blue-600 rounded-full dark:text-blue-500"
									role="status"
									aria-label="loading"
								>
									<span className="sr-only">Loading...</span>
								</div>
							</div>
						</div>
					</div>

					<p className="text-lg text-center">User Data Loading.</p>
				</div>
			</div>
		);
	}

	// if (error) {
	// 	return (
	// 		<div className="bg-white max-w-[300px]">
	// 			<div className="px-4 py-3 flex flex-col items-center gap-3">
	// 				<svg
	// 					xmlns="http://www.w3.org/2000/svg"
	// 					width={36}
	// 					height={36}
	// 					viewBox="0 0 24 24"
	// 					fill="none"
	// 					stroke="#ed4335"
	// 					strokeWidth={2}
	// 					strokeLinecap="round"
	// 					strokeLinejoin="round"
	// 					className="icon icon-tabler icons-tabler-outline icon-tabler-alert-triangle"
	// 				>
	// 					<path stroke="none" d="M0 0h24v24H0z" fill="none" />
	// 					<path d="M12 9v4" />
	// 					<path d="M10.363 3.591l-8.106 13.534a1.914 1.914 0 0 0 1.636 2.871h16.214a1.914 1.914 0 0 0 1.636 -2.87l-8.106 -13.536a1.914 1.914 0 0 0 -3.274 0z" />
	// 					<path d="M12 16h.01" />
	// 				</svg>
	// 				<p className="text-lg text-center">{error}</p>
	// 			</div>
	// 		</div>
	// 	);
	// }

	if (!userData) {
		return (
			<div className="bg-white w-[300px]">
				<div className="px-4 py-3 flex flex-col items-center gap-3">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width={36}
						height={36}
						viewBox="0 0 24 24"
						fill="none"
						stroke="#ed4335"
						strokeWidth={2}
						strokeLinecap="round"
						strokeLinejoin="round"
						className="icon icon-tabler icons-tabler-outline icon-tabler-alert-triangle"
					>
						<path stroke="none" d="M0 0h24v24H0z" fill="none" />
						<path d="M12 9v4" />
						<path d="M10.363 3.591l-8.106 13.534a1.914 1.914 0 0 0 1.636 2.871h16.214a1.914 1.914 0 0 0 1.636 -2.87l-8.106 -13.536a1.914 1.914 0 0 0 -3.274 0z" />
						<path d="M12 16h.01" />
					</svg>
					<p className="text-lg text-center">No user found!</p>
				</div>
			</div>
		);
	}

	return (
		<section className="preview w-80 p-6 bg-white rounded-lg shadow-md">
			<div className="flex flex-col gap-2 items-center">
				<div className="w-32 aspect-square rounded-full overflow-hidden ring-4 ring-brandColor">
					<img src={userData.avatar} alt="user" />
				</div>
				<h3 className="text-2xl font-bold">
					{userData.firstName + ' ' + userData.lastName}
				</h3>
				<p className="text-lg">{userData.email}</p>
			</div>

			<div className="links flex flex-col gap-1 mt-4">
				{userData.links && userData.links.length > 0 ? (
					userData.links.map((link) => {
						const platformDetails = getPlatformDetails(link.platform);
						const backgroundColor = platformDetails?.color || 'gray';

						return (
							<Link
								key={link._id}
								className="flex justify-between py-2 px-4 border rounded-md text-white font-semibold hover:opacity-85 transition-all duration-150"
								to={link.url}
								target="_blank"
								style={{ backgroundColor }}
							>
								<div className="flex items-center gap-2 capitalize">
									<img
										src={platformDetails?.logo}
										alt="logo"
										width={24}
										height={24}
									/>
									<span className="font-semibold">{link.platform}</span>
								</div>
								<span className="font-bold">→</span>
							</Link>
						);
					})
				) : (
					<p className="text-center text-gray-500">No links available.</p>
				)}
			</div>
		</section>
	);
};

export default PublicMockup;
