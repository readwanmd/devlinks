import { jwtDecode } from 'jwt-decode';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
	const token = localStorage.getItem('token');

	if (!token) {
		return <Navigate to={'/signin'} />;
	}

	try {
		const decodedToken = jwtDecode(token);

		const currentTime = Date.now() / 1000;
		if (decodedToken.exp < currentTime) {
			localStorage.removeItem('token');
			return <Navigate to={'/signin'} />;
		}

		return <Outlet />;
	} catch (error) {
		localStorage.removeItem('token');
		return <Navigate to={'/signin'} />;
	}
};

export default PrivateRoute;
