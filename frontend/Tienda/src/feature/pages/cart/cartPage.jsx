import React from "react";
import { useCart } from "../cart/cartContext";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const CartPage = () => {
  const {
    cart,
    total,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
  } = useCart();

  const navigate = useNavigate();

  const handleOrder = async () => {
    try {
      const token = localStorage.getItem("token");

      const products = cart.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
      }));

      await axios.post(
        "http://localhost:5000/api/orders",
        { products },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      clearCart();
      navigate("/order");
    } catch (error) {
      console.error("Error al crear el pedido:", error);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4">
        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-10 text-center shadow-2xl">
          <div className="mb-4 text-6xl">🛒</div>

          <h1 className="mb-2 text-3xl font-bold text-white">
            Tu carrito está vacío
          </h1>

          <p className="text-slate-400">
            Agrega algunos productos para comenzar tu compra.
          </p>
          <Link
            to="/shop"
            className="mt-6 inline-block rounded-xl bg-cyan-500 px-6 py-3 font-semibold text-white transition hover:bg-cyan-600"
          >
            Ver productos
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 px-6 py-10">
      {/* Encabezado */}
      <div className="mx-auto mb-10 max-w-6xl">
        <h1 className="text-4xl font-bold text-white">Carrito de compras</h1>

        <p className="mt-2 text-slate-400">
          Revisa tus productos antes de realizar el pedido.
        </p>
      </div>

      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[2fr_1fr]">
        {/* Productos */}
        <div className="space-y-6">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex flex-col gap-6 rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-xl md:flex-row md:items-center md:justify-between"
            >
              {/* Información */}
              <div className="flex items-center gap-5">
                <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-slate-800 text-3xl">
                  📦
                </div>

                <div>
                  <h2 className="text-xl font-bold text-white">{item.name}</h2>

                  <p className="mt-1 text-slate-400">
                    Precio: ${Number(item.price).toLocaleString("es-CO")}
                  </p>

                  <p className="mt-1 text-cyan-400 font-semibold">
                    Subtotal: $
                    {Number(item.price * item.quantity).toLocaleString("es-CO")}
                  </p>
                </div>
              </div>

              {/* Controles */}
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center overflow-hidden rounded-xl border border-slate-700">
                  <button
                    onClick={() => decreaseQuantity(item.id)}
                    className="cursor-pointer px-4 py-2 text-lg font-bold text-white transition hover:bg-slate-800"
                  >
                    -
                  </button>

                  <div className="border-x border-slate-700 px-5 py-2 font-semibold text-white">
                    {item.quantity}
                  </div>

                  <button
                    onClick={() => increaseQuantity(item.id)}
                    className="cursor-pointer px-4 py-2 text-lg font-bold text-white transition hover:bg-slate-800"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => removeFromCart(item.id)}
                  className="cursor-pointer rounded-xl bg-red-500 px-5 py-2 font-semibold text-white transition hover:bg-red-600"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Resumen */}
        <div className="h-fit rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-xl">
          <h2 className="mb-6 text-2xl font-bold text-white">
            Resumen del pedido
          </h2>

          <div className="mb-6 flex items-center justify-between border-b border-slate-800 pb-4">
            <span className="text-slate-400">Productos</span>

            <span className="font-semibold text-white">{cart.length}</span>
          </div>

          <div className="mb-8 flex items-center justify-between">
            <span className="text-lg font-semibold text-white">Total</span>

            <span className="text-3xl font-bold text-cyan-400">
              ${Number(total).toLocaleString("es-CO")}
            </span>
          </div>

          <button
            onClick={handleOrder}
            className="w-full cursor-pointer rounded-2xl bg-cyan-500 py-4 font-bold text-white transition duration-300 hover:-translate-y-1 hover:bg-cyan-600 hover:shadow-lg hover:shadow-cyan-500/30"
          >
            Realizar pedido
          </button>
        </div>
      </div>
    </div>
  );
};
