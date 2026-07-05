import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export const SideBarClient = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const links = [
    {
      name: "Tienda",
      path: "/shop",
      icon: "🛍️",
    },
    {
      name: "Carrito",
      path: "/cart",
      icon: "🛒",
    },
    {
      name: "Mis pedidos",
      path: "/order",
      icon: "📦",
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <aside className="fixed left-0 top-0 flex h-screen w-72 flex-col border-r border-slate-800 bg-slate-950">
      {/* Logo */}
      <div className="border-b border-slate-800 p-6">
        <h1 className="text-3xl font-bold text-white">
          Shop
          <span className="text-cyan-400">Store</span>
        </h1>

        <p className="mt-2 text-sm text-slate-400">Panel del cliente</p>
      </div>

      {/* Menú */}
      <nav className="flex-1 p-4">
        <ul className="space-y-3">
          {links.map((link) => (
            <li key={link.path}>
              <Link
                to={link.path}
                className={`flex items-center gap-4 rounded-2xl px-5 py-4 transition ${
                  location.pathname === link.path
                    ? "bg-cyan-500 text-white shadow-lg shadow-cyan-500/20"
                    : "text-slate-400 hover:bg-slate-900 hover:text-white"
                }`}
              >
                <span className="text-2xl">{link.icon}</span>

                <span className="font-medium">{link.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Usuario */}
      <div className="border-t border-slate-800 p-6">
        <div className="mb-5 flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-cyan-500 font-bold text-white">
            C
          </div>

          <div>
            <p className="font-semibold text-white">Cliente</p>

            <p className="text-sm text-slate-400">Bienvenido</p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="flex w-full cursor-pointer items-center justify-center gap-3 rounded-2xl border border-red-500/30 bg-red-500/10 px-5 py-3 font-medium text-red-400 transition hover:bg-red-500/20"
        >
          🚪
          <span>Cerrar sesión</span>
        </button>
      </div>
    </aside>
  );
};
