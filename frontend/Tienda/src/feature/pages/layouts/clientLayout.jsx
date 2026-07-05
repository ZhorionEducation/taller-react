import React from "react";
import { Outlet } from "react-router-dom";
import { SideBarClient } from "../../components/sideBarClient";
import { TopNav } from "../../components/topNav";

export const ClientLayout = () => {
  return (
    <>
      <SideBarClient />

      <main className="ml-72 min-h-screen bg-slate-950">
        <TopNav
          title="Tienda online"
          subtitle="Explora productos, gestiona el carrito y revisa tus pedidos"
          showCart
        />
        <Outlet />
      </main>
    </>
  );
};