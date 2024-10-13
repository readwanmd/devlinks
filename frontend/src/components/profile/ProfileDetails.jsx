import axios from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { api } from '../../api';

const ProfileDetails = () => {
	const { user, token } = JSON.parse(localStorage.getItem('user'));
	const apiConfig = {
		headers: { Authorization: `Bearer ${token}` },
	};

	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
	} = useForm();
	const [image, setImage] = useState(user.avatar);
	const [avatarFile, setAvatarFile] = useState(null);

	const onSubmit = async (data) => {
		try {
			let updatedData = { ...data }; // Create a copy of form data

			// Check if a new avatar image has been selected
			if (avatarFile) {
				// Create form data for image upload
				const formData = new FormData();
				formData.append('image', avatarFile);

				// Upload the image to imgbb
				const imgUploadResponse = await axios.post(
					'https://api.imgbb.com/1/upload?key=75a07b3f29218e5017fc1367649f9bfb',
					formData
				);

				if (imgUploadResponse.data.success) {
					const avatarUrl = imgUploadResponse.data.data.url;
					// Update form data with the new avatar URL
					updatedData.avatar = avatarUrl;
				} else {
					throw new Error('Image upload failed');
				}
			}

			// Make a PATCH request to update user details
			const response = await api.patch(
				`/users/${user._id}`,
				updatedData,
				apiConfig
			);

			if (response.data.user) {
				console.log('Profile updated successfully!');

				// Retrieve the existing data from local storage
				const currentData = JSON.parse(localStorage.getItem('user'));

				// Update only the user object while keeping other properties intact
				const updatedLocalStorageData = {
					...currentData,
					user: response.data.user, // Replace the user object with updated user data
				};

				// Save the updated data back to local storage
				localStorage.setItem('user', JSON.stringify(updatedLocalStorageData));

				window.dispatchEvent(new Event('storage'));

				toast('User Details Updated', {
					duration: 1500,
				});
			}
		} catch (error) {
			console.error('Error updating profile:', error);
		}
	};

	// Handle image file change
	const handleImageChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setImage(reader.result); // Display uploaded image
			};
			reader.readAsDataURL(file);
			setValue('profileImage', file); // Set value in react-hook-form
			setAvatarFile(file); // Store the file to upload later
		}
	};

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="max-w-2xl mx-auto space-y-6 bg-white p-6 rounded-lg shadow-md"
		>
			<h1 className="text-3xl font-bold">Profile Details</h1>
			<p className="text-gray-600">
				Add your details to create a personal touch to your profile.
			</p>

			{/* Profile Picture */}
			<div className="flex justify-between items-center gap-4 flex-wrap">
				<div className="flex items-center gap-6">
					<label className="block text-sm font-medium text-gray-700">
						Profile picture
					</label>
					<input
						type="file"
						accept="image/png, image/jpg"
						className="hidden"
						id="profileImageInput"
						{...register('profileImage')}
						onChange={handleImageChange}
					/>
					<div className="relative w-32 h-32">
						<img
							src={image}
							alt="Profile"
							className="w-full h-full object-cover rounded-md"
						/>
						<label
							htmlFor="profileImageInput"
							className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50 text-white text-sm font-bold cursor-pointer rounded-md"
						>
							Change Image
						</label>
					</div>
				</div>
				<div className="w-1/2 max-md:w-full">
					<p className="text-sm text-gray-500">
						Image must be below 1024 x 1024px. Use PNG, JPG only.
					</p>
				</div>
			</div>

			{/* First Name */}
			<div>
				<label className="block text-sm font-medium text-gray-700">
					First name
				</label>
				<input
					type="text"
					defaultValue={user.firstName}
					className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-brandColor focus:border-brandColor sm:text-sm"
					{...register('firstName', { required: 'First name is required' })}
				/>
				{errors.firstName && (
					<p className="text-red-500 text-sm">{errors.firstName.message}</p>
				)}
			</div>

			{/* Last Name */}
			<div>
				<label className="block text-sm font-medium text-gray-700">
					Last name
				</label>
				<input
					type="text"
					defaultValue={user.lastName}
					className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-brandColor focus:border-brandColor sm:text-sm"
					{...register('lastName', { required: 'Last name is required' })}
				/>
				{errors.lastName && (
					<p className="text-red-500 text-sm">{errors.lastName.message}</p>
				)}
			</div>

			{/* Email */}
			<div>
				<label className="block text-sm font-medium text-gray-700">Email</label>
				<input
					type="email"
					defaultValue={user.email}
					readOnly
					className="outline-none cursor-not-allowed mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-brandColor sm:text-sm"
					{...register('email', { required: 'Email is required' })}
				/>
				{errors.email && (
					<p className="text-red-500 text-sm">{errors.email.message}</p>
				)}
			</div>

			{/* Save Button */}
			<button
				type="submit"
				className="w-full bg-brandColor hover:bg-brandColor text-white font-bold py-3 px-6 rounded-md focus:outline-none focus:ring-2 focus:ring-brandColor focus:ring-opacity-50"
			>
				Save
			</button>
		</form>
	);
};

export default ProfileDetails;
