import React from "react";
import { Route, Routes } from "react-router-dom";

import { Login } from "../feature/auth/login";
import { Register } from "../feature/auth/register";

import { ShopPage } from "../feature/pages/shop/shopPage";
import { CartPage } from "../feature/pages/cart/cartPage";
import { OrderPage } from "../feature/pages/order/orderPage";
import { OrderDetailPage } from "../feature/pages/order/orderDetailPage";

import { AdminPage } from "../feature/pages/admin/adminPage";

import { ProtectedRoute } from "./protectecRoute";
import { ClientLayout } from "../feature/pages/layouts/clientLayout";



import { DashboardPage } from "../feature/pages/dashboard/dashboardPage";
import { CustomersPage } from "../feature/pages/customers/customersPage";
import { OrdersAdminPage } from "../feature/pages/ordenAdmin/ordenAdminPage";
import { ProductsAdminPage } from "../feature/pages/productsAdmin/productsAdminPage";
import { CreateAdminPage } from "../feature/pages/registerAdmin/createAdminPage";
import { AdminLayout } from "../feature/pages/layouts/adminLayout";

export const RouterApp = () => {
  return (
    <Routes>
      {/* Rutas públicas. */}
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Rutas del cliente. */}
      <Route
        element={
          <ProtectedRoute allowedRoles={["CLIENT"]}>
            <ClientLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/shop" element={<ShopPage />} />

        <Route path="/cart" element={<CartPage />} />

        <Route path="/order" element={<OrderPage />} />

        <Route path="/orders" element={<OrderPage />} />

        <Route path="/orders/:id" element={<OrderDetailPage />} />
      </Route>

      {/* Rutas del administrador. */}
      <Route
        element={
          <ProtectedRoute allowedRoles={["ADMIN"]}>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/admin" element={<DashboardPage />} />

        <Route path="/admin/customers" element={<CustomersPage />} />

        <Route path="/admin/orders" element={<OrdersAdminPage />} />

        <Route path="/admin/products" element={<ProductsAdminPage />} />

        <Route path="/admin/create-admin" element={<CreateAdminPage />} />
      </Route>
    </Routes>
  );
};
