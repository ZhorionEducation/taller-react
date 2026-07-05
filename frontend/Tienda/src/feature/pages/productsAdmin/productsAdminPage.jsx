import React, { useEffect, useState } from "react";
import axios from "axios";

const emptyForm = {
  name: "",
  description: "",
  image: "",
  price: "",
  stock: "",
};

const resolveProductImage = (image) => {
  if (!image) {
    return "";
  }

  if (image.startsWith("blob:") || image.startsWith("http://") || image.startsWith("https://")) {
    return image;
  }

  if (image.startsWith("/imagenes/") || image.startsWith("imagenes/")) {
    return `http://localhost:5000${image.startsWith("/") ? image : `/${image}`}`;
  }

  return image;
};

export const ProductsAdminPage = () => {
  // Estado del formulario y listado de productos.
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [imagePreviewError, setImagePreviewError] = useState(false);
  const [selectedImageFile, setSelectedImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [fileInputKey, setFileInputKey] = useState(0);

  const token = localStorage.getItem("token");

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const fetchProducts = async () => {
    try {
      // Traemos los productos para mostrarlos en la página.
      const response = await axios.get("http://localhost:5000/api/products");
      setProducts(response.data);
      setError("");
    } catch (err) {
      console.error(err);
      setError("No fue posible cargar los productos.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === "image") {
      setImagePreviewError(false);
    }
  };

  const handleFileChange = (event) => {
    // Guardamos el archivo seleccionado y previsualizamos la imagen.
    const file = event.target.files?.[0] || null;

    setSelectedImageFile(file);
    setImagePreviewError(false);

    if (imagePreview.startsWith("blob:")) {
      URL.revokeObjectURL(imagePreview);
    }

    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
      return;
    }

    setImagePreview(resolveProductImage(formData.image));
  };

  const resetForm = () => {
    // Limpiamos el formulario cuando cancelamos o terminamos.
    if (imagePreview.startsWith("blob:")) {
      URL.revokeObjectURL(imagePreview);
    }

    setFormData(emptyForm);
    setEditingId(null);
    setImagePreviewError(false);
    setSelectedImageFile(null);
    setImagePreview("");
    setFileInputKey((current) => current + 1);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");
    setError("");

    // Enviamos el formulario como FormData para incluir la imagen.
    const payload = new FormData();
    payload.append("name", formData.name);
    payload.append("description", formData.description);
    payload.append("price", String(Number(formData.price)));
    payload.append("stock", String(Number(formData.stock)));

    if (selectedImageFile) {
      payload.append("imageFile", selectedImageFile);
    } else {
      payload.append("image", formData.image || "");
    }

    try {
      if (editingId) {
        // Editar producto existente.
        await axios.put(`http://localhost:5000/api/products/${editingId}`, payload, {
          headers,
        });
        setMessage("Producto actualizado correctamente.");
      } else {
        // Crear producto nuevo.
        await axios.post("http://localhost:5000/api/products", payload, {
          headers,
        });
        setMessage("Producto creado correctamente.");
      }

      resetForm();
      await fetchProducts();
    } catch (err) {
      console.error(err);
      setError("No fue posible guardar el producto.");
    }
  };

  const handleEdit = (product) => {
    // Cargamos los datos del producto en el formulario.
    setEditingId(product.id);
    setFormData({
      name: product.name || "",
      description: product.description || "",
      image: product.image || "",
      price: product.price ?? "",
      stock: product.stock ?? "",
    });
    setSelectedImageFile(null);
    setImagePreview(resolveProductImage(product.image));
    setImagePreviewError(false);
    setFileInputKey((current) => current + 1);
  };

  const handleDelete = async (id) => {
    // Eliminamos el producto solo si el usuario confirma.
    const shouldDelete = window.confirm("¿Seguro que deseas eliminar este producto?");
    if (!shouldDelete) return;

    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`, {
        headers,
      });
      setMessage("Producto eliminado correctamente.");
      await fetchProducts();
    } catch (err) {
      console.error(err);
      setError("No fue posible eliminar el producto.");
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-slate-400">
        Cargando productos...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-4xl font-bold">Productos</h1>
            <p className="mt-2 text-slate-400">Crea, edita y elimina productos desde el panel.</p>
          </div>
          <p className="text-sm text-slate-500">Total: {products.length}</p>
        </div>

        {message ? <div className="mb-6 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-5 py-4 text-emerald-300">{message}</div> : null}
        {error ? <div className="mb-6 rounded-2xl border border-red-500/30 bg-red-500/10 px-5 py-4 text-red-300">{error}</div> : null}

        <form onSubmit={handleSubmit} className="mb-10 grid gap-5 rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-2xl md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">Nombre</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none transition focus:border-cyan-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">Precio</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none transition focus:border-cyan-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">Stock</label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none transition focus:border-cyan-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">Imagen del producto</label>
            <input
              key={fileInputKey}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none transition file:mr-4 file:rounded-lg file:border-0 file:bg-cyan-500 file:px-4 file:py-2 file:font-semibold file:text-white hover:border-cyan-500"
            />
            
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-medium text-slate-300">Descripción</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              required
              className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none transition focus:border-cyan-500"
            />
          </div>

          <div className="md:col-span-2">
            <p className="mb-2 text-sm font-medium text-slate-300">Vista previa</p>
            <div className="flex h-56 items-center justify-center overflow-hidden rounded-2xl border border-slate-700 bg-slate-950/70">
              {(imagePreview || formData.image) ? (
                imagePreviewError ? (
                  <div className="text-center text-slate-400">
                    <div className="mb-2 text-4xl">📦</div>
                    <p className="text-sm">No se pudo cargar la imagen.</p>
                  </div>
                ) : (
                  <img
                    src={imagePreview || resolveProductImage(formData.image)}
                    alt={formData.name || "Vista previa del producto"}
                    className="h-full w-full object-cover"
                    onError={() => setImagePreviewError(true)}
                  />
                )
              ) : (
                <div className="text-center text-slate-400">
                  <div className="mb-2 text-4xl">🖼️</div>
                  <p className="text-sm">Aquí verás la imagen antes de guardar.</p>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-wrap gap-3 md:col-span-2">
            <button
              type="submit"
              className="rounded-xl bg-cyan-500 px-6 py-3 font-semibold text-white transition hover:bg-cyan-600 hover:shadow-lg hover:shadow-cyan-500/30"
            >
              {editingId ? "Actualizar producto" : "Crear producto"}
            </button>

            {editingId ? (
              <button
                type="button"
                onClick={resetForm}
                className="rounded-xl border border-slate-700 px-6 py-3 font-semibold text-white transition hover:border-cyan-500 hover:text-cyan-300"
              >
                Cancelar edición
              </button>
            ) : null}
          </div>
        </form>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {products.map((product) => (
            <article key={product.id} className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 shadow-2xl">
              <div className="flex h-44 items-center justify-center overflow-hidden bg-slate-800">
                {product.image ? (
                  <img src={resolveProductImage(product.image)} alt={product.name} className="h-full w-full object-cover" />
                ) : (
                  <span className="text-5xl">📦</span>
                )}
              </div>
              <div className="space-y-3 p-6">
                <h2 className="text-xl font-bold text-white">{product.name}</h2>
                <p className="line-clamp-3 text-sm text-slate-400">{product.description}</p>
                <div className="flex items-center justify-between text-sm text-slate-300">
                  <span>${Number(product.price).toLocaleString("es-CO")}</span>
                  <span>Stock: {product.stock}</span>
                </div>
                <div className="flex flex-wrap gap-2 pt-2">
                  <button
                    onClick={() => handleEdit(product)}
                    className="rounded-xl border border-slate-700 px-4 py-2 text-sm font-semibold text-white transition hover:border-cyan-500 hover:text-cyan-300"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="rounded-xl bg-red-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-600"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};