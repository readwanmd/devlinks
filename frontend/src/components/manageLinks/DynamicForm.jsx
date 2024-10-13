import React, { useCallback, useEffect, useMemo } from 'react';
import { Controller, useFieldArray, useForm, useWatch } from 'react-hook-form';
import { toast } from 'react-toastify';
import { api } from '../../api';
import usePreview from '../../hooks/usePreview';
import { platforms } from '../../utils/platforms';

// eslint-disable-next-line react/display-name
const LinkField = React.memo(
	({ index, control, remove, handleDelete, isStored }) => {
		return (
			<div className="bg-gray-50 p-6 rounded-lg shadow-md relative">
				<h3 className="font-semibold text-lg mb-4">Link #{index + 1}</h3>
				<div>
					<label className="block text-sm font-medium text-gray-700">
						Platform
					</label>
					<Controller
						name={`links.${index}.platform`}
						control={control}
						render={({ field }) => (
							<select
								{...field}
								className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
							>
								<option value="">Select platform</option>
								{platforms.map((platform) => (
									<option key={platform.platform} value={platform.platform}>
										{platform.platform.charAt(0).toUpperCase() +
											platform.platform.slice(1)}
									</option>
								))}
							</select>
						)}
					/>
				</div>

				<div>
					<label className="block text-sm font-medium text-gray-700">
						Link
					</label>
					<Controller
						name={`links.${index}.url`}
						control={control}
						render={({ field }) => (
							<input
								{...field}
								type="url"
								className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
								placeholder="https://example.com"
							/>
						)}
					/>
				</div>

				<button
					type="button"
					onClick={() => handleDelete(index, isStored)}
					className="absolute top-4 right-4 text-red-500 hover:text-red-700"
				>
					Remove
				</button>
			</div>
		);
	}
);

const DynamicForm = () => {
	const { token, links: storedLinks = [] } = JSON.parse(
		localStorage.getItem('user') || '{}'
	);
	const apiConfig = useMemo(
		() => ({ headers: { Authorization: `Bearer ${token}` } }),
		[token]
	);
	const { preview, setPreview } = usePreview();

	const { control, handleSubmit, reset } = useForm({
		defaultValues: useMemo(
			() => ({
				links: preview?.links?.length
					? preview.links
					: [{ platform: '', url: '' }],
			}),
			[]
		),
	});

	const { fields, append, remove } = useFieldArray({
		control,
		name: 'links',
	});

	const formValues = useWatch({
		control,
		name: 'links',
	});

	useEffect(() => {
		if (preview?.links?.length) {
			reset({ links: preview.links });
		}
	}, []);

	// Update preview whenever form values change
	useEffect(() => {
		if (JSON.stringify(formValues) !== JSON.stringify(preview?.links)) {
			setPreview((prev) => ({ ...prev, links: formValues }));
		}
	}, [formValues, setPreview, preview]);

	const handleAppend = useCallback(() => {
		append({ platform: '', url: '' });
	}, [append]);

	// Handle remove links
	const handleDelete = useCallback(
		async (index, isStored) => {
			const platform = formValues[index].platform;

			if (isStored) {
				const confirmDelete = window.confirm(
					`Are you sure you want to permanently delete the link for ${platform}?`
				);

				if (confirmDelete) {
					try {
						// delete API
						await api.delete(`/links/${platform}`, apiConfig);

						// Remove link from localStorage
						const updatedUser = JSON.parse(
							localStorage.getItem('user') || '{}'
						);
						updatedUser.links = updatedUser.links.filter(
							(link) => link.platform !== platform
						);
						localStorage.setItem('user', JSON.stringify(updatedUser));

						// Remove from the UI
						remove(index);

						toast('Link Removed Successfully.', {
							duration: 1500,
						});

						console.log('Link deleted successfully');
					} catch (error) {
						console.error('Error deleting link:', error);
					}
				}
			} else {
				// If the link is not stored in local storage,
				remove(index);
			}
		},
		[formValues, remove, apiConfig]
	);

	const onSubmit = useCallback(
		async (data) => {
			try {
				const response = await api.post('/links', data, apiConfig);
				const userData = JSON.parse(localStorage.getItem('user') || '{}');
				userData.links = response.data.links;
				localStorage.setItem('user', JSON.stringify(userData));
				console.log('Form submitted successfully:', response.data);
				toast('Link Added Successfully', {
					duration: 1500,
				});
			} catch (error) {
				console.error('Error submitting form:', error);
			}
		},
		[apiConfig]
	);

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
			{fields.map((field, index) => {
				const isStored = storedLinks.some(
					(link) =>
						link.platform.toLowerCase() ===
						formValues[index]?.platform?.toLowerCase()
				);
				return (
					<LinkField
						key={field.id}
						index={index}
						control={control}
						remove={remove}
						handleDelete={handleDelete}
						isStored={isStored}
					/>
				);
			})}

			<button
				type="button"
				onClick={handleAppend}
				className="block w-full bg-transparent text-brandColor font-bold py-2 px-4 rounded-md border border-brandColor"
			>
				+ Add new link
			</button>

			<div className="flex justify-end mt-3">
				<button
					type="submit"
					className="w-fit bg-brandColor text-white font-bold py-2 px-6 rounded outline-none"
				>
					Save
				</button>
			</div>
		</form>
	);
};

export default React.memo(DynamicForm);
