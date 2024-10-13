import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { api } from '../../api';

const SignUp = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const [apiError, setApiError] = useState('');
	const navigate = useNavigate();

	const onSubmit = async (data) => {
		try {
			// API call to register
			const registerResponse = await api.post('/auth/register', data);
			console.log('Sign up successful', registerResponse.data);
			setApiError('');

			// Automatically login after successful signup
			const loginResponse = await api.post('/auth/login', {
				email: data.email,
				password: data.password,
			});
			localStorage.setItem('token', loginResponse.data.token);
			localStorage.setItem('user', JSON.stringify(loginResponse.data));

			navigate('/');
			toast('Successfully Signed up.', {
				duration: 1500,
			});
		} catch (error) {
			if (error.response && error.response.status === 400) {
				setApiError(error.response.data.message);
			} else {
				setApiError('Something went wrong. Please try again.');
			}
		}
	};

	return (
		<div className="min-h-screen flex">
			<div className="hidden lg:flex w-1/2 bg-gradient-to-br from-brandColor to-blue-500 p-12 flex-col justify-center items-center">
				<img
					src="/assets/signup.svg"
					alt="Sign Up Illustration"
					className="w-3/4"
				/>
			</div>

			<div className="w-full lg:w-1/2 flex items-center justify-center">
				<div className="max-w-xl w-full p-8">
					<h1 className="text-3xl font-bold mb-6 text-center">Sign Up</h1>

					<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
						<div>
							<label className="block text-sm font-medium text-gray-700">
								First Name
							</label>
							<input
								type="text"
								className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
								{...register('firstName', {
									required: 'First Name is required',
								})}
							/>
							{errors.firstName && (
								<p className="text-red-500 text-sm">
									{errors.firstName.message}
								</p>
							)}
						</div>

						<div>
							<label className="block text-sm font-medium text-gray-700">
								Last Name
							</label>
							<input
								type="text"
								className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
								{...register('lastName', { required: 'Last Name is required' })}
							/>
							{errors.lastName && (
								<p className="text-red-500 text-sm">
									{errors.lastName.message}
								</p>
							)}
						</div>

						<div>
							<label className="block text-sm font-medium text-gray-700">
								Username
							</label>
							<input
								type="text"
								className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
								{...register('username', { required: 'Username is required' })}
							/>
							{errors.username && (
								<p className="text-red-500 text-sm">
									{errors.username.message}
								</p>
							)}
						</div>

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

						{apiError && <p className="text-red-500 text-center">{apiError}</p>}

						<button
							type="submit"
							className="w-full bg-brandColor text-white font-bold py-3 px-6 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
						>
							Sign Up
						</button>

						<p className="text-lg text-gray-600 text-center mt-4">
							Already have an account?{' '}
							<Link
								to="/signin"
								className="text-purple-600 hover:text-purple-700"
							>
								Sign In
							</Link>
						</p>
					</form>
				</div>
			</div>
		</div>
	);
};

export default SignUp;
