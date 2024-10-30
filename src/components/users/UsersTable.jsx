import { useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";

const userData = [
	{ id: 1, name: "Jose luis Guerrero", email: "joseluis@gmial.com", role: "Cliente", status: "Activo" },
	{ id: 2, name: "Oliver Ricalde", email: "oliver@gmail.com", role: "Administrador", status: "Activo" },
	{ id: 3, name: "Sergio Gabriel", email: "sergio@gmail.com", role: "Cliente", status: "Inactivo" },
	{ id: 4, name: "Karla Castilla", email: "karla@gmail.com", role: "Cliente", status: "Activo" },
	{ id: 5, name: "Christopher Montalvo", email: "christopher@gmail.com", role: "Moredador", status: "Activo" },
];

const UsersTable = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const [filteredUsers, setFilteredUsers] = useState(userData);
	const [isAddModalOpen, setIsAddModalOpen] = useState(false);
	const [isEditModalOpen, setIsEditModalOpen] = useState(false);
	const [newUser, setNewUser] = useState({ name: "", email: "", role: "", status: "" });
	const [userToEdit, setUserToEdit] = useState(null);

	const handleSearch = (e) => {
		const term = e.target.value.toLowerCase();
		setSearchTerm(term);
		const filtered = userData.filter(
			(user) => user.name.toLowerCase().includes(term) || user.email.toLowerCase().includes(term)
		);
		setFilteredUsers(filtered);
	};

	const openAddModal = () => setIsAddModalOpen(true);
	const closeAddModal = () => setIsAddModalOpen(false);

	const openEditModal = (user) => {
		setUserToEdit(user);
		setIsEditModalOpen(true);
	};
	const closeEditModal = () => setIsEditModalOpen(false);

	const addNewUser = () => {
		const updatedUsers = [...filteredUsers, { ...newUser, id: Date.now() }];
		setFilteredUsers(updatedUsers);
		closeAddModal();
		setNewUser({ name: "", email: "", role: "", status: "" });
	};

	const saveEditedUser = () => {
		const updatedUsers = filteredUsers.map((user) => (user.id === userToEdit.id ? userToEdit : user));
		setFilteredUsers(updatedUsers);
		closeEditModal();
	};

	const deleteUser = (id) => {
		const updatedUsers = filteredUsers.filter((user) => user.id !== id);
		setFilteredUsers(updatedUsers);
	};

	return (
		<motion.div
			className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.2 }}
		>
			<div className='flex justify-between items-center mb-6'>
				<h2 className='text-xl font-semibold text-gray-100'>Usuarios</h2>
				<button onClick={openAddModal} className='bg-green-500 text-white px-4 py-2 rounded'>Añadir Usuario</button>
				<div className='relative'>
					<input
						type='text'
						placeholder='Buscar usuario...'
						className='bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
						value={searchTerm}
						onChange={handleSearch}
					/>
					<Search className='absolute left-3 top-2.5 text-gray-400' size={18} />
				</div>
			</div>

			<div className='overflow-x-auto'>
				<table className='min-w-full divide-y divide-gray-700'>
					<thead>
						<tr>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
								Nombre
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
								Correo electronico
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
								Rol
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
								Estado
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
								Modificacion
							</th>
						</tr>
					</thead>

					<tbody className='divide-y divide-gray-700'>
						{filteredUsers.map((user) => (
							<motion.tr
								key={user.id}
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ duration: 0.3 }}
							>
								<td className='px-6 py-4 whitespace-nowrap'>
									<div className='flex items-center'>
										<div className='flex-shrink-0 h-10 w-10'>
											<div className='h-10 w-10 rounded-full bg-gradient-to-r from-purple-400 to-blue-500 flex items-center justify-center text-white font-semibold'>
												{user.name.charAt(0)}
											</div>
										</div>
										<div className='ml-4'>
											<div className='text-sm font-medium text-gray-100'>{user.name}</div>
										</div>
									</div>
								</td>

								<td className='px-6 py-4 whitespace-nowrap'>
									<div className='text-sm text-gray-300'>{user.email}</div>
								</td>
								<td className='px-6 py-4 whitespace-nowrap'>
									<span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-800 text-blue-100'>
										{user.role}
									</span>
								</td>

								<td className='px-6 py-4 whitespace-nowrap'>
									<span
										className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
											user.status === "Activo"
												? "bg-green-800 text-green-100"
												: "bg-red-800 text-red-100"
										}`}
									>
										{user.status}
									</span>
								</td>

								<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
									<button onClick={() => openEditModal(user)} className='text-indigo-400 hover:text-indigo-300 mr-2'>Editar</button>
									<button onClick={() => deleteUser(user.id)} className='text-red-400 hover:text-red-300'>Eliminar</button>
								</td>
							</motion.tr>
						))}
					</tbody>
				</table>
			</div>

			{/* Modal para añadir usuario */}
			{isAddModalOpen && (
				<div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center">
					<div className="bg-white rounded-lg shadow-lg p-4 w-80 max-h-[400px] overflow-y-auto">
						<h2 className="text-xl font-bold mb-4 text-black">Añadir Usuario</h2>
						<div className="mb-2">
							<label className="block text-black">Nombre</label>
							<input
								type="text"
								name="name"
								value={newUser.name}
								onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
								className="w-full p-2 border rounded text-black"
							/>
						</div>
						<div className="mb-2">
							<label className="block text-black">Correo Electrónico</label>
							<input
								type="email"
								name="email"
								value={newUser.email}
								onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
								className="w-full p-2 border rounded text-black"
							/>
						</div>
						<div className="mb-2">
							<label className="block text-black">Rol</label>
							<input
								type="text"
								name="role"
								value={newUser.role}
								onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
								className="w-full p-2 border rounded text-black"
							/>
						</div>
						<div className="mb-2">
							<label className="block text-black">Estado</label>
							<select
								name="status"
								value={newUser.status}
								onChange={(e) => setNewUser({ ...newUser, status: e.target.value })}
								className="w-full p-2 border rounded text-black"
							>
								<option value="">Seleccione estado</option>
								<option value="Activo">Activo</option>
								<option value="Inactivo">Inactivo</option>
							</select>
						</div>
						<div className="flex justify-between mt-4">
							<button onClick={addNewUser} className="bg-green-500 text-white px-4 py-2 rounded">Añadir</button>
							<button onClick={closeAddModal} className="bg-red-500 text-white px-4 py-2 rounded">Cancelar</button>
						</div>
					</div>
				</div>
			)}

			{/* Modal para editar usuario */}
			{isEditModalOpen && (
				<div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center">
					<div className="bg-white rounded-lg shadow-lg p-4 w-80 max-h-[400px] overflow-y-auto">
						<h2 className="text-xl font-bold mb-4 text-black">Editar Usuario</h2>
						<div className="mb-2">
							<label className="block text-black">Nombre</label>
							<input
								type="text"
								name="name"
								value={userToEdit.name}
								onChange={(e) => setUserToEdit({ ...userToEdit, name: e.target.value })}
								className="w-full p-2 border rounded text-black"
							/>
						</div>
						<div className="mb-2">
							<label className="block text-black">Correo Electrónico</label>
							<input
								type="email"
								name="email"
								value={userToEdit.email}
								onChange={(e) => setUserToEdit({ ...userToEdit, email: e.target.value })}
								className="w-full p-2 border rounded text-black"
							/>
						</div>
						<div className="mb-2">
							<label className="block text-black">Rol</label>
							<input
								type="text"
								name="role"
								value={userToEdit.role}
								onChange={(e) => setUserToEdit({ ...userToEdit, role: e.target.value })}
								className="w-full p-2 border rounded text-black"
							/>
						</div>
						<div className="mb-2">
							<label className="block text-black">Estado</label>
							<select
								name="status"
								value={userToEdit.status}
								onChange={(e) => setUserToEdit({ ...userToEdit, status: e.target.value })}
								className="w-full p-2 border rounded text-black"
							>
								<option value="Activo">Activo</option>
								<option value="Inactivo">Inactivo</option>
							</select>
						</div>
						<div className="flex justify-between mt-4">
							<button onClick={saveEditedUser} className="bg-blue-500 text-white px-4 py-2 rounded">Guardar</button>
							<button onClick={closeEditModal} className="bg-red-500 text-white px-4 py-2 rounded">Cancelar</button>
						</div>
					</div>
				</div>
			)}
		</motion.div>
	);
};

export default UsersTable;
