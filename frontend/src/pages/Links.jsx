import { useEffect } from 'react';
import ManageLinks from '../components/manageLinks/manageLinks';
import Mockup from '../components/Mockup';
import usePreview from '../hooks/usePreview';

const Links = () => {
	const { preview } = usePreview();

	useEffect(() => {
		console.log({ preview });
		if (preview.user === null) {
			window.location.reload();
		}
	}, []);

	return (
		<div className="bg-purple-50 py-12">
			<div className="container flex gap-4">
				<div className="bg-white rounded-md w-1/2 max-md:hidden flex items-center justify-center sticky top-4 h-full py-8">
					<Mockup />
				</div>

				<div className="md:w-1/2 w-full overflow-auto">
					<ManageLinks />
				</div>
			</div>
		</div>
	);
};

export default Links;
