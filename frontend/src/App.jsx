import { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AppRoutes from './routes/AppRoutes';

const App = () => {
	useEffect(() => {
		toast(
			'Backend is hosted at onrender, It take around 50 seconds to start the server. please consider this time.',
			{
				autoClose: 8000,
				hideProgressBar: false,
				position: 'top-center',
			}
		);
	}, []);

	return (
		<>
			<Router>
				<AppRoutes />
			</Router>

			<ToastContainer
				position="bottom-center"
				autoClose={2500}
				hideProgressBar
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="dark"
			/>
		</>
	);
};
export default App;
