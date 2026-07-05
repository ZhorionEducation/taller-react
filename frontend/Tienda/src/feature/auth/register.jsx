import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const Register = () => {
  // Datos del formulario de registro.
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    address: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Quitamos espacios para evitar campos aparentemente vacíos.
    const trimmedData = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      password: formData.password.trim(),
      address: formData.address.trim(),
    };

    if (!trimmedData.name || !trimmedData.email || !trimmedData.password || !trimmedData.phone || !trimmedData.address) {
      setError("Completa todos los campos antes de registrarte.");
      return;
    }

    try {
      // Enviamos el registro al backend.
      setLoading(true);
      await axios.post("http://localhost:5000/api/auth/register", trimmedData);
      setSuccess("Registro exitoso. Ya puedes iniciar sesión.");
      setFormData({
        name: "",
        email: "",
        phone: "",
        password: "",
        address: "",
      });
      setTimeout(() => {
        navigate("/login");
      }, 900);
    } catch (error) {
      console.error(error);
      setError(error?.response?.data?.error || "Error al registrar. Por favor, inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4 py-10">
      {/* Fondos decorativos */}
      <div className="absolute left-20 top-20 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl"></div>
      <div className="absolute bottom-20 right-20 h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl"></div>

      {/* Card */}
      <div className="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/80 p-8 shadow-2xl backdrop-blur-xl">
        {/* Encabezado */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-500 text-2xl font-bold text-white shadow-lg">
            S
          </div>

          <h1 className="text-3xl font-bold text-white">Crear cuenta</h1>

          <p className="mt-2 text-sm text-slate-400">
            Regístrate para comenzar a comprar en nuestra tienda
          </p>
        </div>

        {/* Formulario */}
        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Nombre y correo. */}
          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Nombre completo
              </label>

              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Ingresa tu nombre"
                required
                className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/30"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Correo electrónico
              </label>

              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="correo@ejemplo.com"
                required
                className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/30"
              />
            </div>
          </div>

          {/* Teléfono y contraseña. */}
          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Teléfono
              </label>

              <input
                type="tel"
                name="phone"
                id="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="3001234567"
                required
                className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/30"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Contraseña
              </label>

              <input
                type="password"
                name="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
                className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/30"
              />
            </div>
          </div>

          {/* Dirección del cliente. */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Dirección
            </label>

            <textarea
              name="address"
              id="address"
              value={formData.address}
              onChange={handleChange}
              rows="3"
              placeholder="Ingresa tu dirección"
              required
              className="w-full resize-none rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/30"
            ></textarea>
          </div>

          {error ? (
            <p className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
              {error}
            </p>
          ) : null}

          {success ? (
            <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300">
              {success}
            </div>
          ) : null}

          {/* Botón principal del registro. */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-cyan-500 py-3 font-semibold text-white shadow-lg transition duration-300 hover:-translate-y-0.5 hover:bg-cyan-600 hover:shadow-cyan-500/30 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Registrando..." : "Crear cuenta"}
          </button>
        </form>

        {/* Separador visual. */}
        <div className="my-6 flex items-center">
          <div className="h-px flex-1 bg-slate-700"></div>
          <span className="px-4 text-sm text-slate-500">o</span>
          <div className="h-px flex-1 bg-slate-700"></div>
        </div>

        {/* Enlace al login. */}
        <p className="text-center text-sm text-slate-400">
          ¿Ya tienes una cuenta?{" "}
          <Link
            to="/login"
            className="font-medium text-cyan-400 transition hover:text-cyan-300"
          >
            Inicia sesión
          </Link>
        </p>
      </div>
    </div>
  );
};
