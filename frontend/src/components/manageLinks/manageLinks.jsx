import DynamicForm from './DynamicForm';

const ManageLinks = () => {
	return (
		<div className="bg-white shadow-md p-8 max-md:p-4 rounded-md">
			<h2 className="text-3xl font-semibold">Customize your links</h2>
			<p className="text-lg">
				Add/Edit/Remove links bellow and then share all your profiles with the
				world!
			</p>

			<div className="mt-4">
				<DynamicForm />
			</div>
		</div>
	);
};
export default ManageLinks;
