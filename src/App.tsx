import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from 'sonner';
import { AuthProvider } from "./contexts/AuthContext";
import MainLayout from "./components/layouts/MainLayout";
import AdminLayout from "./components/layouts/AdminLayout";

// Page Imports
import HomePage from "./pages/store/HomePage";
import ProductDetailsPage from "./pages/store/ProductDetailsPage";
import CartPage from "./pages/store/CartPage";
import CheckoutPage from "./pages/store/CheckoutPage";

import CustomerLoginPage from "./pages/auth/CustomerLoginPage";
import CustomerRegisterPage from "./pages/auth/CustomerRegisterPage";
import AdminLoginPage from "./pages/auth/AdminLoginPage";

import CustomerDashboardPage from "./pages/customer/CustomerDashboardPage";
import CustomerOrdersPage from "./pages/customer/CustomerOrdersPage";
import CustomerProfilePage from "./pages/customer/CustomerProfilePage";

import AdminDashboardPage from "./pages/admin/AdminDashboardPage";
import AdminProductsPage from "./pages/admin/AdminProductsPage";
import AdminOrdersPage from "./pages/admin/AdminOrdersPage";
import AdminReportsPage from "./pages/admin/AdminReportsPage";
import AdminPromotionsPage from "./pages/admin/AdminPromotionsPage";

import ProtectedRoute from "./components/auth/ProtectedRoute";
import AdminRoute from "./components/auth/AdminRoute";
import ChatbotPopup from "./components/store/ChatbotPopup";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Storefront Routes */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/produto/:id" element={<ProductDetailsPage />} />
            <Route path="/carrinho" element={<CartPage />} />
            <Route path="/login" element={<CustomerLoginPage />} />
            <Route path="/cadastro" element={<CustomerRegisterPage />} />
            
            {/* Customer Protected Routes */}
            <Route path="/checkout" element={<ProtectedRoute><CheckoutPage /></ProtectedRoute>} />
            <Route path="/cliente/dashboard" element={<ProtectedRoute><CustomerDashboardPage /></ProtectedRoute>} />
            <Route path="/cliente/historico" element={<ProtectedRoute><CustomerOrdersPage /></ProtectedRoute>} />
            <Route path="/cliente/perfil" element={<ProtectedRoute><CustomerProfilePage /></ProtectedRoute>} />
          </Route>

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route element={<AdminRoute><AdminLayout /></AdminRoute>}>
            <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
            <Route path="/admin/produtos" element={<AdminProductsPage />} />
            <Route path="/admin/pedidos" element={<AdminOrdersPage />} />
            <Route path="/admin/vendas" element={<AdminReportsPage />} />
            <Route path="/admin/promocoes" element={<AdminPromotionsPage />} />
          </Route>
        </Routes>
        <Toaster richColors position="top-right" />
        <ChatbotPopup />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
