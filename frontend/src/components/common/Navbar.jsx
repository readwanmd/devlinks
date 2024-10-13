import { NavLink } from 'react-router-dom';
import SignOut from '../SignOut';

const Navbar = () => {
	return (
		<nav className="container w-full flex justify-between items-center py-4 bg-white shadow-sm">
			<div className="flex items-center">
				<img src="/assets/logo_alt.png" alt="Logo" className="h-8 w-8 mr-2" />
				<span className="max-md:hidden text-xl font-bold text-gray-900">
					devlinks
				</span>
			</div>

			<div className="flex flex-1 justify-center items-center gap-6">
				<NavLink
					to="/links"
					className={({ isActive }) =>
						`flex items-center gap-2 py-1 px-3 rounded-md font-semibold text-gray-700  ${
							isActive ? 'bg-brandColor/25 text-[#613AFF]' : ''
						}`
					}
				>
					{({ isActive }) => (
						<>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width={24}
								height={24}
								viewBox="0 0 24 24"
								fill="none"
								stroke={isActive ? '#613AFF' : 'black'}
								strokeWidth={2}
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<path stroke="none" d="M0 0h24v24H0z" fill="none" />
								<path d="M9 15l6 -6" />
								<path d="M11 6l.463 -.536a5 5 0 0 1 7.071 7.072l-.534 .464" />
								<path d="M13 18l-.397 .534a5.068 5.068 0 0 1 -7.127 0a4.972 4.972 0 0 1 0 -7.071l.524 -.463" />
							</svg>
							<span className="max-md:hidden">Links</span>
						</>
					)}
				</NavLink>

				<NavLink
					to="/profile"
					className={({ isActive }) =>
						`flex items-center gap-2 font-semibold text-gray-600 py-1 px-3 rounded-md ${
							isActive ? 'bg-brandColor/20 text-[#613AFF]' : ''
						}`
					}
				>
					{({ isActive }) => (
						<>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width={24}
								height={24}
								viewBox="0 0 24 24"
								fill="none"
								stroke={isActive ? '#613AFF' : 'black'}
								strokeWidth="1.25"
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<path stroke="none" d="M0 0h24v24H0z" fill="none" />
								<path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
								<path d="M12 10m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
								<path d="M6.168 18.849a4 4 0 0 1 3.832 -2.849h4a4 4 0 0 1 3.834 2.855" />
							</svg>

							<span className="max-md:hidden">Profile Details</span>
						</>
					)}
				</NavLink>

				<NavLink
					to="/preview"
					className={({ isActive }) =>
						`flex items-center gap-2 font-semibold text-gray-600 py-1 px-3 rounded-md ${
							isActive ? 'bg-brandColor/20 text-[#613AFF]' : ''
						}`
					}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width={24}
						height={24}
						viewBox="0 0 24 24"
						fill="none"
						stroke="#613AFF"
						strokeWidth="1.25"
						strokeLinecap="round"
						strokeLinejoin="round"
					>
						<path stroke="none" d="M0 0h24v24H0z" fill="none" />
						<path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
						<path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" />
					</svg>

					<span className="max-md:hidden font-semibold">Preview</span>
				</NavLink>
			</div>

			<div>
				<SignOut />
			</div>
		</nav>
	);
};

export default Navbar;
