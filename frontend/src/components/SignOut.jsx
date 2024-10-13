import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const SignOut = () => {
	const navigate = useNavigate();
	const handleSignOut = () => {
		localStorage.removeItem('user');
		localStorage.removeItem('token');
		navigate('/signin');
		toast('User Signed out.', {
			duration: 1500,
		});
	};

	return (
		<div onClick={handleSignOut} className="md:flex cursor-pointer">
			<div className="flex items-center gap-2 border border-brandColor px-4 py-2 rounded text-brandColor">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width={24}
					height={24}
					viewBox="0 0 24 24"
					fill="none"
					stroke="#613AFF"
					strokeWidth={2}
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<path stroke="none" d="M0 0h24v24H0z" fill="none" />
					<path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />
					<path d="M9 12h12l-3 -3" />
					<path d="M18 15l3 -3" />
				</svg>

				<span className="max-md:hidden font-semibold">Log out</span>
			</div>
		</div>
	);
};
export default SignOut;
