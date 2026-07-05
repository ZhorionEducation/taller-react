import React, { useEffect, useState } from "react";
import axios from "axios";

const statusOptions = ["PENDIENTE", "APROBADO", "RECHAZADO", "ENVIADO", "ENTREGADO"];

export const OrdersAdminPage = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [statusDrafts, setStatusDrafts] = useState({});

  const token = localStorage.getItem("token");

  const fetchOrders = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/orders", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(response.data);
      setStatusDrafts(
        response.data.reduce((acc, order) => {
          acc[order.id] = order.status;
          return acc;
        }, {}),
      );
      setError("");
    } catch (err) {
      console.error(err);
      setError("No fue posible cargar los pedidos.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const openDetail = async (orderId) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/orders/${orderId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSelectedOrder(response.data);
    } catch (err) {
      console.error(err);
      setError("No fue posible cargar el detalle del pedido.");
    }
  };

  const updateStatus = async (orderId) => {
    try {
      await axios.put(
        `http://localhost:5000/api/orders/${orderId}/status`,
        { status: statusDrafts[orderId] },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      setMessage("Estado actualizado correctamente.");
      await fetchOrders();
      if (selectedOrder?.id === orderId) {
        await openDetail(orderId);
      }
    } catch (err) {
      console.error(err);
      setError("No fue posible actualizar el estado.");
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-slate-400">
        Cargando pedidos...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-4xl font-bold">Pedidos</h1>
            <p className="mt-2 text-slate-400">Administra todos los pedidos y cambia su estado.</p>
          </div>
          <p className="text-sm text-slate-500">Total: {orders.length}</p>
        </div>

        {message ? <div className="mb-6 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-5 py-4 text-emerald-300">{message}</div> : null}
        {error ? <div className="mb-6 rounded-2xl border border-red-500/30 bg-red-500/10 px-5 py-4 text-red-300">{error}</div> : null}

        <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
          <div className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 shadow-2xl">
            <table className="w-full text-left">
              <thead className="border-b border-slate-800 bg-slate-950/50 text-sm text-slate-400">
                <tr>
                  <th className="p-4">Pedido</th>
                  <th className="p-4">Cliente</th>
                  <th className="p-4">Fecha</th>
                  <th className="p-4">Total</th>
                  <th className="p-4">Estado</th>
                  <th className="p-4">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className="border-b border-slate-800 hover:bg-slate-800/40">
                    <td className="p-4 font-semibold">#{order.id}</td>
                    <td className="p-4 text-slate-300">{order.user_name || order.name || order.user?.name || "-"}</td>
                    <td className="p-4 text-slate-400">{new Date(order.created_at).toLocaleDateString("es-CO")}</td>
                    <td className="p-4 text-cyan-400">${Number(order.total).toLocaleString("es-CO")}</td>
                    <td className="p-4">
                      <select
                        value={statusDrafts[order.id] || order.status}
                        onChange={(event) =>
                          setStatusDrafts({
                            ...statusDrafts,
                            [order.id]: event.target.value,
                          })
                        }
                        className="rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-white outline-none"
                      >
                        {statusOptions.map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="p-4">
                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={() => updateStatus(order.id)}
                          className="rounded-xl bg-cyan-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-cyan-600"
                        >
                          Guardar
                        </button>
                        <button
                          onClick={() => openDetail(order.id)}
                          className="rounded-xl border border-slate-700 px-4 py-2 text-sm font-semibold text-white transition hover:border-cyan-500 hover:text-cyan-300"
                        >
                          Ver detalle
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-2xl">
            {selectedOrder ? (
              <div>
                <h2 className="text-2xl font-bold">Pedido #{selectedOrder.id}</h2>
                <p className="mt-2 text-slate-400">Cliente: {selectedOrder.user_name  || "-"}</p>
                <p className="mt-2 text-slate-400">Estado: <span className="text-cyan-400">{selectedOrder.status}</span></p>
                <p className="mt-2 text-slate-400">Fecha: {new Date(selectedOrder.created_at).toLocaleDateString("es-CO")}</p>

                <div className="mt-6 space-y-4">
                  {selectedOrder.details?.map((detail) => (
                    <div key={detail.product_id} className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
                      <p className="font-semibold text-white">{detail.name}</p>
                      <p className="text-sm text-slate-400">Cantidad: {detail.quantity}</p>
                      <p className="text-sm text-slate-400">Precio unitario: ${Number(detail.price).toLocaleString("es-CO")}</p>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <p className="text-slate-400">Selecciona un pedido para ver su detalle.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};