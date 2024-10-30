import { User } from "lucide-react";
import SettingSection from "./SettingSection";
import { useAuth } from '../../context/AuthContext'; // Asegúrate de que esta ruta sea correcta

const Profile = () => {
	// Recuperar los datos del usuario del localStorage
	const nombres = localStorage.getItem('nombres');
	const apellidos = localStorage.getItem('apellidos');
	const email = localStorage.getItem('email');

	const { logout } = useAuth(); // Obtiene la función de logout del contexto

	const handleLogout = () => {
		logout(); // Llama a la función de logout al hacer clic en el botón
		navigate("/login");
	};

	return (
		<SettingSection icon={User} title={"Perfil"}>
			<div className='flex flex-col sm:flex-row items-center mb-6'>
				<img
					src='https://i.pinimg.com/236x/4d/5d/ba/4d5dba55e51eb904f18e37bfa750bdfe.jpg'
					alt='Profile'
					className='rounded-full w-20 h-20 object-cover mr-4'
				/>

				<div>
					<h3 className='text-lg font-semibold text-gray-100'>{`${nombres} ${apellidos}`}</h3>
					<p className='text-gray-400'>{email}</p>
				</div>
			</div>

			<button 
				onClick={handleLogout} // Cambiar aquí para manejar el clic
				className='bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded transition duration-200 w-full sm:w-auto'
			>
				Cerrar sesión
			</button>
		</SettingSection>
	);
};

export default Profile;
