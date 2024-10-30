// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // useEffect para comprobar si el token existe en localStorage
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
      console.log("Usuario autenticado"); // Debug: Confirma autenticación
    } else {
      console.log("Usuario no autenticado"); // Debug: Confirma no autenticación
    }
  }, []);

  // Función de login que guarda el token y actualiza el estado
  const login = (response) => {
    localStorage.setItem('token', response.token);
    localStorage.setItem('nombres', response.nombres); // Asegúrate de que estos campos existen en la respuesta
    localStorage.setItem('apellidos', response.apellidos);
    localStorage.setItem('email', response.email);
    setIsAuthenticated(true);
    console.log("Login exitoso, token guardado"); // Debug: Confirmación de login
  };

  // Función de logout que elimina el token y actualiza el estado
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem('nombres');
    localStorage.removeItem('apellidos');
    localStorage.removeItem('email');
    setIsAuthenticated(false);
    console.log("Usuario ha cerrado sesión"); // Debug: Confirmación de logout
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
