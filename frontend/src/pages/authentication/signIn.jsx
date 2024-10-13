import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { api } from '../../api';

const SignIn = () => {
	const [apiError, setApiError] = useState(null);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const navigate = useNavigate();

	const onSubmit = async (data) => {
		console.log(data);
		try {
			const res = await api.post('/auth/login', data);

			localStorage.setItem('token', res.data.token);
			localStorage.setItem('user', JSON.stringify(res.data));
			navigate('/links');
			toast('Successfully Signed in.', {
				duration: 1500,
			});
		} catch (error) {
			console.log('Login failed:', error);
			setApiError('Login failed. Please check your credentials and try again.');
		}
	};

	return (
		<div className="min-h-screen flex">
			<div className="hidden lg:flex w-1/2 bg-gradient-to-br from-brandColor to-blue-500 p-12 flex-col justify-center items-center">
				{/* <img src="/assets/logo.png" alt="Logo" className="w-40 mb-6" /> */}
				<img
					src="/assets/signin.svg"
					alt="Sign In Illustration"
					className="w-3/4"
				/>
			</div>

			<div className="w-full lg:w-1/2 flex items-center justify-center">
				<div className="max-w-xl w-full p-8">
					<div className="flex justify-center items-center mb-10 ">
						<img src="/assets/logo.png" alt="Logo" className="w-48 mb-6" />
					</div>

					<h1 className="text-3xl font-bold mb-6 text-center">Sign In</h1>

					<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
						<div>
							<label className="block text-sm font-medium text-gray-700">
								Email
							</label>
							<input
								type="email"
								className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
								{...register('email', { required: 'Email is required' })}
							/>
							{errors.email && (
								<p className="text-red-500 text-sm">{errors.email.message}</p>
							)}
						</div>

						<div>
							<label className="block text-sm font-medium text-gray-700">
								Password
							</label>
							<input
								type="password"
								className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
								{...register('password', { required: 'Password is required' })}
							/>
							{errors.password && (
								<p className="text-red-500 text-sm">
									{errors.password.message}
								</p>
							)}
						</div>

						{apiError && <p className="text-red-500 text-sm">{apiError}</p>}

						<button
							type="submit"
							className="w-full bg-brandColor text-white font-bold py-3 px-6 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
						>
							Sign In
						</button>

						{/* redirect to signup */}
						<p className="text-lg text-gray-600 text-center mt-4">
							Don&apos;t have an account?{' '}
							<Link
								to="/signup"
								className="text-purple-600 hover:text-purple-700"
							>
								Sign up
							</Link>
						</p>
					</form>
				</div>
			</div>
		</div>
	);
};

export default SignIn;
