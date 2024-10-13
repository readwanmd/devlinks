import Mockup from '../components/Mockup';
import ProfileDetails from '../components/profile/ProfileDetails';

const Profile = () => {
	return (
		<div className="bg-purple-50 py-12">
			<div className="container flex gap-4">
				<div className="bg-white rounded-md w-1/2 max-md:hidden flex items-center justify-center sticky top-4 h-full py-8">
					<Mockup />
				</div>

				<div className="md:w-1/2 w-full overflow-auto">
					<ProfileDetails />
				</div>
			</div>
		</div>
	);
};
export default Profile;
