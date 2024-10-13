import Navbar_Alt from '../components/common/Navbar_Alt';
import PublicMockup from '../components/PublicMockup';

const PublicView = () => {
	return (
		<div className="relative">
			<div className="bg-brandColor pt-4 ">
				<div className="container">
					<Navbar_Alt />
				</div>
			</div>
			<div className="background bg-brandColor w-full h-[30vh] rounded-b-3xl"></div>
			<div className="flex justify-center -mt-48">
				<PublicMockup />
			</div>
		</div>
	);
};

export default PublicView;
