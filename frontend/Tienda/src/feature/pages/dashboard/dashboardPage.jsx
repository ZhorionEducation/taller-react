import React, { useEffect, useState } from "react";
import axios from "axios";

export const DashboardPage = () => {
  const apiUsers = "http://localhost:5000/api/users";
  const apiProducts = "http://localhost:5000/api/products";
  const apiOrders = "http://localhost:5000/api/orders";

  const token = localStorage.getItem("token");

  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const headers = {
          Authorization: `Bearer ${token}`,
        };

        const [usersRes, productsRes, ordersRes] = await Promise.all([
          axios.get(apiUsers, { headers }),
          axios.get(apiProducts, { headers }),
          axios.get(apiOrders, { headers }),
        ]);

        setUsers(usersRes.data);
        setProducts(productsRes.data);
        setOrders(ordersRes.data);
      } catch (error) {
        console.error("Error dashboard:", error);
      } finally {
        setLoading(false);
      }
    };

    if (token) fetchData();
  }, [token]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-950 text-slate-400">
        Cargando dashboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      {/* HEADER */}
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold text-white">Dashboard</h1>
        <p className="mt-3 text-slate-400">
          Panel de administración del sistema
        </p>
      </div>

      {/* CARDS */}
      <div className="mx-auto mb-10 grid max-w-7xl gap-8 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 transition hover:-translate-y-1 hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/10">
          <h2 className="text-slate-400">Usuarios</h2>
          <p className="mt-2 text-3xl font-bold text-cyan-400">
            {users.length}
          </p>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 transition hover:-translate-y-1 hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/10">
          <h2 className="text-slate-400">Productos</h2>
          <p className="mt-2 text-3xl font-bold text-cyan-400">
            {products.length}
          </p>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 transition hover:-translate-y-1 hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/10">
          <h2 className="text-slate-400">Órdenes</h2>
          <p className="mt-2 text-3xl font-bold text-cyan-400">
            {orders.length}
          </p>
        </div>
      </div>

      {/* LISTAS */}
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-3">
        {/* USERS */}
        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
          <h3 className="mb-4 text-lg font-semibold text-white">
            Últimos usuarios
          </h3>

          <ul className="space-y-3">
            {users.slice(0, 5).map((u) => (
              <li
                key={u.id}
                className="rounded-xl bg-slate-800 px-4 py-3 text-slate-300"
              >
                {u.name || u.email}
              </li>
            ))}
          </ul>
        </div>

        {/* PRODUCTS */}
        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
          <h3 className="mb-4 text-lg font-semibold text-white">
            Productos recientes
          </h3>

          <ul className="space-y-3">
            {products.slice(0, 5).map((p) => (
              <li
                key={p.id}
                className="rounded-xl bg-slate-800 px-4 py-3 text-slate-300"
              >
                {p.name}
              </li>
            ))}
          </ul>
        </div>

        {/* ORDERS */}
        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
          <h3 className="mb-4 text-lg font-semibold text-white">
            Órdenes recientes
          </h3>

          <ul className="space-y-3">
            {orders.slice(0, 5).map((o) => (
              <li
                key={o.id}
                className="rounded-xl bg-slate-800 px-4 py-3 text-slate-300"
              >
                Orden #{o.id} -{" "}
                <span className="text-cyan-400">{o.status}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
