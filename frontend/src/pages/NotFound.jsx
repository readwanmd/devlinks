import { NavLink } from 'react-router-dom';

const NotFound = () => {
	return (
		<div className="w-full h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-800">
			<div className="flex justify-center items-center mb-10 ">
				<img src="/assets/logo.png" alt="Logo" className="w-48 mb-6" />
			</div>
			<div className="flex items-center max-md:flex-col space-x-4 text-center">
				<span className="text-9xl font-bold text-brandColor md:border-r-2 md:border-gray-300 pr-4">
					404
				</span>
				<div className="md:pl-4 max-md:mt-4">
					<h1 className="text-4xl font-semibold  mb-2">Page Not Found</h1>
					<p className="text-lg text-gray-500">
						Sorry, the page you are looking for doesn&apos;t exist.
					</p>
				</div>
			</div>
			<NavLink
				to="/"
				className="mt-8 bg-brandColor text-white px-6 py-2 rounded-md text-lg font-semibold hover:bg-brandColorHover transition"
			>
				Back to Home
			</NavLink>
		</div>
	);
};

export default NotFound;
