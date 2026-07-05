import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export const OrderDetailPage = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/orders/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setOrder(response.data);
      })
      .catch((error) => {
        console.error(
          "Error al obtener los detalles del pedido:",
          error
        );
      });
  }, [id, token]);

  if (!order) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4">
        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-10 text-center shadow-2xl">
          <div className="mb-4 text-6xl">⏳</div>

          <h1 className="text-3xl font-bold text-white">
            Cargando detalles del pedido...
          </h1>

          <p className="mt-3 text-slate-400">
            Estamos obteniendo la información de tu pedido.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 px-6 py-10">
      {/* Fondo decorativo */}
      <div className="absolute left-20 top-20 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl"></div>
      <div className="absolute right-20 top-60 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl"></div>

      <div className="relative mx-auto max-w-5xl">
        {/* Encabezado */}
        <div className="mb-8 rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-2xl">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="mb-2 text-sm uppercase tracking-wider text-cyan-400">
                Pedido
              </p>

              <h1 className="text-4xl font-bold text-white">
                #{order.id}
              </h1>

              <p className="mt-4 text-slate-400">
                Fecha:
                {" "}
                {new Date(
                  order.created_at
                ).toLocaleDateString("es-CO")}
              </p>
            </div>

            <div className="text-left md:text-right">
              <span className="inline-block rounded-full bg-yellow-500/20 px-4 py-2 text-sm font-semibold text-yellow-400">
                {order.status}
              </span>

              <h2 className="mt-4 text-3xl font-bold text-cyan-400">
                $
                {Number(order.total).toLocaleString(
                  "es-CO"
                )}
              </h2>

              <p className="text-sm text-slate-500">
                Total del pedido
              </p>
            </div>
          </div>
        </div>

        {/* Productos */}
        <h2 className="mb-6 text-2xl font-bold text-white">
          Productos del pedido
        </h2>

        <div className="space-y-5">
          {order.details.map((detail) => (
            <div
              key={detail.product_id}
              className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-xl transition duration-300 hover:-translate-y-1 hover:border-cyan-500/40"
            >
              <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                {/* Producto */}
                <div className="flex items-center gap-5">
                  <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-slate-800 text-3xl">
                    📦
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold text-white">
                      {detail.name}
                    </h3>

                    <p className="mt-2 text-slate-400">
                      Cantidad:
                      {" "}
                      <span className="font-semibold text-white">
                        {detail.quantity}
                      </span>
                    </p>

                    <p className="mt-2 text-slate-400">
                      Precio unitario:
                      {" "}
                      <span className="font-semibold text-cyan-400">
                        $
                        {Number(
                          detail.price
                        ).toLocaleString("es-CO")}
                      </span>
                    </p>
                  </div>
                </div>

                {/* Subtotal */}
                <div className="text-left md:text-right">
                  <p className="text-sm uppercase tracking-wider text-slate-500">
                    Subtotal
                  </p>

                  <h3 className="mt-2 text-3xl font-bold text-white">
                    $
                    {Number(
                      detail.price *
                        detail.quantity
                    ).toLocaleString("es-CO")}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};