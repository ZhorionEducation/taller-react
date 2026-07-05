import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCart } from "../cart/cartContext";

const resolveProductImage = (image) => {
  if (!image) {
    return "";
  }

  if (image.startsWith("http://") || image.startsWith("https://") || image.startsWith("blob:")) {
    return image;
  }

  if (image.startsWith("/imagenes/") || image.startsWith("imagenes/")) {
    return `http://localhost:5000${image.startsWith("/") ? image : `/${image}`}`;
  }

  return image;
};

export const ShopPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { addToCart } = useCart();
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const respuesta = await axios.get("http://localhost:5000/api/products");
        setProducts(respuesta.data);
        setError("");
      } catch (error) {
        console.error("Error al obtener los productos:", error);
        setError("No fue posible cargar los productos.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-slate-400">
        Cargando productos...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 px-6 py-10">
      {/* Encabezado */}
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold text-white">Nuestra Tienda</h1>

        <p className="mt-3 text-slate-400">
          Explora nuestros productos y agrega tus favoritos al carrito.
        </p>
      </div>

      {/* Grid de productos */}
      {error ? (
        <div className="mx-auto mb-8 max-w-3xl rounded-2xl border border-red-500/30 bg-red-500/10 px-5 py-4 text-red-300">
          {error}
        </div>
      ) : null}

      <div className="mx-auto grid max-w-7xl gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="group overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 transition duration-300 hover:-translate-y-2 hover:border-cyan-500/50 hover:shadow-2xl hover:shadow-cyan-500/10"
          >
            <div className="flex h-52 items-center justify-center overflow-hidden bg-slate-800">
              {product.image ? (
                <img
                  src={resolveProductImage(product.image)}
                  alt={product.name}
                  className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                  onError={(event) => {
                    event.currentTarget.style.display = "none";
                  }}
                />
              ) : (
                <span className="text-5xl">📦</span>
              )}
            </div>

            {/* Información */}
            <div className="p-6">
              <h2 className="mb-2 line-clamp-1 text-xl font-bold text-white">
                {product.name}
              </h2>

              <p className="mb-5 line-clamp-2 text-sm text-slate-400">
                {product.stock} en stock
              </p>

              <p className="mb-5 line-clamp-3 text-sm text-slate-400">
                {product.description}
              </p>

              <div className="mb-5 flex items-center justify-between">
                <span className="text-2xl font-bold text-cyan-400">
                  ${Number(product.price).toLocaleString("es-CO")}
                </span>
              </div>

              <button
                className="w-full cursor-pointer rounded-xl bg-cyan-500 py-3 font-semibold text-white transition duration-300 hover:bg-cyan-600 hover:shadow-lg hover:shadow-cyan-500/30"
                onClick={() => addToCart(product)}
              >
                Agregar al carrito
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Cuando no haya productos */}
      {products.length === 0 && (
        <div className="mt-20 text-center text-slate-400">
          No hay productos disponibles.
        </div>
      )}
    </div>
  );
};
