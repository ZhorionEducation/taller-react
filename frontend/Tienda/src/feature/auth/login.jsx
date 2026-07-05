import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./authContext";

export const Login = () => {
  // Datos del formulario de inicio de sesión.
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Validamos credenciales contra la API.
      const respuesta = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email: formData.email,
          password: formData.password,
        },
      );
      login(respuesta.data.token, respuesta.data.role);

      // Redirigimos según el rol del usuario.
      if (respuesta.data.role === "ADMIN") {
        navigate("/admin");
      } else if (respuesta.data.role === "CLIENT") {
        navigate("/shop");
      }
    } catch (error) {
      setError("Credenciales inválidas. Por favor, inténtalo de nuevo.");
      console.error(error);
    }
  };

  const formChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4">
      {/* Fondo decorativo */}
      <div className="absolute left-20 top-20 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl"></div>
      <div className="absolute bottom-20 right-20 h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl"></div>

      {/* Card */}
      <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/80 p-8 shadow-2xl backdrop-blur-xl">
        {/* Encabezado */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-500 text-2xl font-bold text-white shadow-lg">
            Shop
          </div>

          <h1 className="text-3xl font-bold text-white">Bienvenido</h1>

          <p className="mt-2 text-sm text-slate-400">
            Inicia sesión para continuar
          </p>
        </div>

        {/* Formulario */}
        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Correo del usuario. */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Correo electrónico
            </label>

            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={formChange}
              placeholder="correo@ejemplo.com"
              className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/30"
            />
          </div>

          {/* Contraseña del usuario. */}
          <div>
            <div className="mb-2 flex items-center justify-between">
              <label className="text-sm font-medium text-slate-300">
                Contraseña
              </label>
            </div>

            <input
              type="password"
              name="password"
              id="password"
              placeholder="••••••••"
              className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/30"
              value={formData.password}
              onChange={formChange}
            />
          </div>
            {error && (
                <p className="text-sm text-red-500">{error}</p>
            )}
          {/* Botón para iniciar sesión. */}
          <button
            type="submit"
            className="w-full cursor-pointer rounded-xl bg-cyan-500 py-3 font-semibold text-white shadow-lg transition duration-300 hover:-translate-y-0.5 hover:bg-cyan-600 hover:shadow-cyan-500/30"
          >
            Iniciar sesión
          </button>
        </form>

        {/* Separador visual. */}
        <div className="my-6 flex items-center">
          <div className="h-px flex-1 bg-slate-700"></div>
          <span className="px-4 text-sm text-slate-500">o</span>
          <div className="h-px flex-1 bg-slate-700"></div>
        </div>

        {/* Enlace al registro. */}
        <p className="text-center text-sm text-slate-400">
          ¿No tienes una cuenta?{" "}
          <Link to="/register"
            type="button"
            className="font-medium text-cyan-400 transition hover:text-cyan-300"
          >
            Regístrate
          </Link>
        </p>
      </div>
    </div>
  );
};
