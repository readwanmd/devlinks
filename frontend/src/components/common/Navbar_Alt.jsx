import { NavLink } from 'react-router-dom';

const Navbar_Alt = () => {
	return (
		<nav className="container bg-white py-4 rounded-md flex justify-between">
			<div className="flex items-center">
				<img src="/assets/logo_alt.png" alt="Logo" className="h-8 w-8 mr-2" />
				<span className="max-md:hidden text-xl font-bold text-gray-900">
					devlinks
				</span>
			</div>

			<NavLink
				to={'/signin'}
				className="border bg-brandColor px-4 py-2 rounded text-white font-semibold"
			>
				Get yours
			</NavLink>
		</nav>
	);
};
export default Navbar_Alt;
