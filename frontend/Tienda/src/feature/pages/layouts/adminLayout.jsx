import React from "react";
import { Outlet } from "react-router-dom";
import { SideBarAdmin } from "../../components/sideBarAdmin";
import { TopNav } from "../../components/topNav";


export const AdminLayout = () => {
  return (
    <>
      <SideBarAdmin />

      <main className="ml-72 min-h-screen bg-slate-950">
        <TopNav
          title="Panel administrativo"
          subtitle="Gestiona clientes, productos y pedidos"
        />
        <Outlet />
      </main>
    </>
  );
};