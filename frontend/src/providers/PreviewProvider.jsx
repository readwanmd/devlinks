import { useEffect, useState } from 'react';
import PreviewContext from '../context/PreviewContext';

const PreviewProvider = ({ children }) => {
	const [preview, setPreview] = useState(() => {
		const storedUser = localStorage.getItem('user');
		const user = storedUser ? JSON.parse(storedUser) : null;
		return { user, links: user?.links || [] };
	});

	useEffect(() => {
		const handleStorageChange = () => {
			const storedUser = localStorage.getItem('user');
			const user = storedUser ? JSON.parse(storedUser) : null;
			setPreview((prevState) => ({
				...prevState,
				user,
				links: user?.links || [],
			}));
		};

		window.addEventListener('storage', handleStorageChange);

		return () => {
			window.removeEventListener('storage', handleStorageChange);
		};
	}, []);

	return (
		<PreviewContext.Provider value={{ preview, setPreview }}>
			{children}
		</PreviewContext.Provider>
	);
};

export default PreviewProvider;
