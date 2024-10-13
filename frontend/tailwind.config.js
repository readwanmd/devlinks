/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			container: {
				center: true,
				padding: '2rem',
			},
			colors: {
				brandColor: '#613AFF',
			},
		},
	},
	plugins: [],
};
