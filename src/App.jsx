import { Route, Routes, useLocation } from "react-router-dom";

import Sidebar from "./components/common/Sidebar";

import OverviewPage from "./pages/OverviewPage";
import ProductsPage from "./pages/ProductsPage";
import UsersPage from "./pages/UsersPage";
import SalesPage from "./pages/SalesPage";
import OrdersPage from "./pages/OrdersPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import SettingsPage from "./pages/SettingsPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProtectedRoute from './ProtectedRoute'; // Asegúrate de que la ruta sea correcta

function App() {
  const location = useLocation();
  const isAuthPage = location.pathname === "/login" || location.pathname === "/register";

  return (
    <div className="flex h-screen bg-gray-900 text-gray-100 overflow-hidden">
      {!isAuthPage && (
        // Solo se muestra el contenedor de fondo y Sidebar si no es página de login o registro
        <>
          <div className="fixed inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-green-800 to-purple-900 opacity-80" />
            <div className="absolute inset-0 backdrop-blur-sm" />
          </div>
          <Sidebar />
        </>
      )}

      <div className="flex flex-col flex-grow">
        <Routes>
          {/* Páginas de Autenticación (sin contenedor) */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Rutas protegidas */}
          <Route element={<ProtectedRoute />}>
            <Route path='/' element={<OverviewPage />} />
            <Route path='/products' element={<ProductsPage />} />
            <Route path='/users' element={<UsersPage />} />
            <Route path='/sales' element={<SalesPage />} />
            <Route path='/orders' element={<OrdersPage />} />
            <Route path='/analytics' element={<AnalyticsPage />} />
            <Route path='/settings' element={<SettingsPage />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
