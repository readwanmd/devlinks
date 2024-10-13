import { Route, Routes } from 'react-router-dom';
import MainLayout from '../layout/MainLayout';
import SignIn from '../pages/authentication/signIn';
import SignUp from '../pages/authentication/Signup';
import Links from '../pages/Links';
import NotFound from '../pages/NotFound';
import Preview from '../pages/Preview';
import Profile from '../pages/Profile';
import PublicView from '../pages/PublicView';
import PreviewProvider from '../providers/PreviewProvider';
import PrivateRoute from './PrivateRoute';

const AppRoutes = () => {
	return (
		<PreviewProvider>
			<Routes>
				<Route path="/signin" element={<SignIn />} />
				<Route path="/signup" element={<SignUp />} />

				<Route element={<PrivateRoute />}>
					<Route element={<MainLayout />}>
						<Route path="/" element={<Links />} />
						<Route path="/links" element={<Links />} />
						<Route path="/profile" element={<Profile />} />
					</Route>

					<Route path="/preview" element={<Preview />} />
				</Route>

				<Route path="/:username" element={<PublicView />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		</PreviewProvider>
	);
};
export default AppRoutes;
