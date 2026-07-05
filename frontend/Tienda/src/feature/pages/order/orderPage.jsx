import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const OrderPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/orders/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setOrders(response.data);
        setError("");
      })
      .catch((error) => {
        console.error("Error al obtener las órdenes:", error);
        setError("No fue posible cargar tus pedidos.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [token]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-slate-400">
        Cargando pedidos...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 px-6 py-10">
      {/* Encabezado */}
      <div className="mx-auto mb-10 max-w-6xl">
        <h1 className="text-4xl font-bold text-white">Mis pedidos</h1>

        <p className="mt-2 text-slate-400">
          Consulta el estado de tus compras y revisa el historial de pedidos
          realizados.
        </p>
      </div>

      {/* Sin pedidos */}
      {error ? (
        <div className="mx-auto mb-8 max-w-6xl rounded-2xl border border-red-500/30 bg-red-500/10 px-5 py-4 text-red-300">
          {error}
        </div>
      ) : orders.length === 0 ? (
        <div className="flex items-center justify-center">
          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-10 text-center shadow-2xl">
            <div className="mb-4 text-6xl">📦</div>

            <h2 className="mb-2 text-2xl font-bold text-white">
              No tienes pedidos
            </h2>

            <p className="text-slate-400">
              Cuando realices una compra, aparecerá aquí.
            </p>
          </div>
        </div>
      ) : (
        <div className="mx-auto grid max-w-6xl gap-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-xl transition hover:border-cyan-500/40"
            >
              <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                {/* Información */}
                <div>
                  <h2 className="text-2xl font-bold text-white">
                    Pedido #{order.id}
                  </h2>

                  <p className="mt-2 text-slate-400">
                    Fecha:{" "}
                    {new Date(order.created_at).toLocaleDateString("es-CO")}
                  </p>

                  <p className="mt-2 text-slate-400">
                    Total:{" "}
                    <span className="font-semibold text-cyan-400">
                      ${Number(order.total).toLocaleString("es-CO")}
                    </span>
                  </p>
                </div>

                {/* Estado y botón */}
                <div className="flex flex-col items-start gap-4 md:items-end">
                  <span className="rounded-full bg-yellow-500/20 px-4 py-2 text-sm font-semibold text-yellow-400">
                    {order.status}
                  </span>

                  <button
                    className="cursor-pointer rounded-xl bg-cyan-500 px-6 py-3 font-semibold text-white transition hover:bg-cyan-600 hover:shadow-lg hover:shadow-cyan-500/30"
                    onClick={() => navigate(`/orders/${order.id}`)}
                  >
                    Ver detalle
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
