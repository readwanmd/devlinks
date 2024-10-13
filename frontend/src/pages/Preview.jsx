import NavForPreview from '../components/common/NavForPreview';
import Mockup from '../components/Mockup';

const Preview = () => {
	return (
		<div className="relative">
			<div className="bg-brandColor pt-4">
				<div className="container">
					<NavForPreview />
				</div>
			</div>
			<div className="background bg-brandColor w-full h-[30vh] rounded-b-3xl"></div>
			<div className="flex justify-center -mt-48">
				<Mockup />
			</div>
		</div>
	);
};

export default Preview;
