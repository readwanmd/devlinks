import { Link } from 'react-router-dom';
import usePreview from '../hooks/usePreview';
import { platforms } from '../utils/platforms';

const Mockup = () => {
	const getPlatformDetails = (platformName) => {
		return platforms.find(
			(platform) =>
				platform.platform.toLowerCase() === platformName.toLowerCase()
		);
	};

	const { preview } = usePreview();
	const { user, links } = preview;

	return (
		<section className="preview w-80 p-6 bg-white rounded-lg shadow-md">
			<div className="flex flex-col gap-2 items-center">
				<div className="w-32 aspect-square rounded-full overflow-hidden ring-4 ring-brandColor">
					<img src={user?.user?.avatar} alt="user" />
				</div>
				<h3 className="text-2xl font-bold">
					{user?.user?.firstName + ' ' + user?.user?.lastName}
				</h3>
				<p className="text-lg">{user?.email}</p>
			</div>

			<div className="links flex flex-col gap-1 mt-4">
				{links.length &&
					links.map((link) => {
						const platformDetails = getPlatformDetails(link.platform);
						const backgroundColor = platformDetails?.color || 'gray';

						return (
							<Link
								key={link.id || crypto.randomUUID()}
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
					})}
			</div>
		</section>
	);
};

export default Mockup;
