// src/api/api.js
import API_URL from './api';

// Función para autenticar al usuario
export const loginUser = async (email, password) => {
  try {
    const response = await fetch(`${API_URL}/usuarios/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error("Error en la autenticación");
    }

    const data = await response.json();

    // Suponiendo que tu API devuelve un token en data.token
    if (data.token) {
      return data; // Retorna el token
    }

    return { success: false, message: "Token no recibido" }; // Maneja si no se recibe el token
  } catch (error) {
    console.error("Error durante la autenticación:", error);
    return { success: false, message: "Error al iniciar sesión." };
  }
};

export const registerUser = async (nombres, apellidos, email, password) => {
  try {
    const response = await fetch(`${API_URL}/usuarios`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nombres, apellidos, email, password }),
    });

    const statusCode = response.status; // Obtener el código de estado
    const data = await response.json(); // Parseamos la respuesta JSON

    // Manejar el código de estado
    if (statusCode === 201) {
      // Registro exitoso
      return data;
    } else if (statusCode === 400) {
      throw new Error("Datos de registro incorrectos.");
    } else if (statusCode === 401) {
      throw new Error("No autorizado.");
    } else {
      throw new Error(data.message || "Error en el registro.");
    }
  } catch (error) {
    console.error("Error al registrar el usuario:", error);
    throw error; // Lanza el error para manejarlo más arriba en la cadena
  }
};