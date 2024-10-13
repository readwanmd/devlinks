const Home = () => {
	return (
		<section className="bg-gradient-to-r from-blue-500 to-brandColor text-white py-20 h-screen w-full">
			<div className="container text-center">
				<h1 className="text-4xl md:text-6xl font-bold mb-6">
					Share Your Favorite Links Effortlessly
				</h1>
				<p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
					Explore, share, and manage links with ease on our platform. Create an
					account today and start sharing!
				</p>
				<button className="bg-gradient-to-r from-teal-400 to-blue-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:from-blue-500 hover:to-teal-400 transition duration-300">
					Get Started
				</button>
			</div>
		</section>
	);
};

export default Home;
