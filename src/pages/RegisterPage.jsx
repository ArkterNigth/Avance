import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from '../remote/user-request'; // Asegúrate de que esta ruta sea correcta

const RegisterPage = () => {
  const [nombres, setNombres] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(""); // Para el mensaje de éxito
  const [errorMessage, setErrorMessage] = useState(""); // Para manejar mensajes de error
  const [isSubmitting, setIsSubmitting] = useState(false); // Estado para manejar el envío
  const navigate = useNavigate(); // Hook para la redirección

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar que las contraseñas coincidan
    if (password !== confirmPassword) {
      setErrorMessage("Las contraseñas no coinciden.");
      return;
    }

    // Reiniciar mensajes de error y éxito antes de hacer la solicitud
    setErrorMessage("");
    setMessage("");
    setIsSubmitting(true); // Bloquear el botón al iniciar el envío

    try {
      const response = await registerUser(nombres, apellidos, email, password);
      // Suponiendo que la respuesta es correcta, muestra un mensaje de éxito
      setMessage("Registro exitoso. Redirigiendo al inicio de sesión...");
      // Redirigir después de 2 segundos
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      // Manejar el error y mostrar el mensaje correspondiente
      setErrorMessage(error.message);
    } finally {
      setIsSubmitting(false); // Habilitar el botón nuevamente
    }
  };

  return (
    <div
      className="flex items-center justify-center h-screen bg-cover bg-center"
      style={{ backgroundImage: `url('banner2.png')` }}
    >
      <div className="w-full max-w-md p-8 bg-white bg-opacity-90 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-800">Registro de Usuario</h2>
        
        {message && <p className="text-green-500 text-center">{message}</p>} {/* Mensaje de éxito */}
        {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>} {/* Mensaje de error */}

        <form onSubmit={handleSubmit} className="space-y-4 mt-6">
          <div>
            <label htmlFor="nombres" className="block text-sm font-medium text-gray-700">
              Nombres
            </label>
            <input
              type="text"
              id="nombres"
              value={nombres}
              onChange={(e) => setNombres(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-800 bg-white"
            />
          </div>
          <div>
            <label htmlFor="apellidos" className="block text-sm font-medium text-gray-700">
              Apellidos
            </label>
            <input
              type="text"
              id="apellidos"
              value={apellidos}
              onChange={(e) => setApellidos(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-800 bg-white"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Correo Electrónico
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-800 bg-white"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-800 bg-white"
            />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              Confirmar Contraseña
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-800 bg-white"
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting} // Deshabilitar el botón si isSubmitting es true
            className={`w-full py-2 px-4 ${isSubmitting ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'} text-white font-semibold rounded-md shadow focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
          >
            {isSubmitting ? 'Registrando...' : 'Registrarse'}
          </button>
        </form>
        <p className="text-center text-sm text-gray-600 mt-4">
          ¿Ya tienes una cuenta?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Inicia sesión aquí
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
