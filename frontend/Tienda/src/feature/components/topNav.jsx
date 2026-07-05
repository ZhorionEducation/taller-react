import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/authContext";
import { useCart } from "../pages/cart/cartContext";

export const TopNav = ({ title, subtitle, showCart = false }) => {
  const { cart } = useCart();
  const { logout, role } = useAuth();
  const navigate = useNavigate();


  return (
    <header className="sticky top-0 z-10 border-b border-slate-800 bg-slate-950/90 backdrop-blur">
      <div className="flex flex-col gap-4 px-6 py-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-cyan-400">
            {role === "ADMIN" ? "Administrador" : "Cliente"}
          </p>
          <h1 className="text-2xl font-bold text-white">{title}</h1>
          {subtitle ? <p className="mt-1 text-sm text-slate-400">{subtitle}</p> : null}
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {showCart ? (
            <Link
              to="/cart"
              className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:border-cyan-500 hover:text-cyan-300"
            >
              Carrito {cart.length > 0 ? `(${cart.length})` : "(0)"}
            </Link>
          ) : null}
          
        </div>
      </div>
    </header>
  );
};