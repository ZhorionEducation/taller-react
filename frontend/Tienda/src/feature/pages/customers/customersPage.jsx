import React, { useEffect } from "react";
import axios from "axios";

export const CustomersPage = () => {
  const apiUsers = "http://localhost:5000/api/users";
  const token = localStorage.getItem("token");

  const [users, setUsers] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const headers = {
          Authorization: `Bearer ${token}`,
        };
        const response = await axios.get(apiUsers, { headers });
        setUsers(response.data.filter((user) => user.role === "CLIENT"));
        setError("");
      } catch (error) {
        console.error("Error fetching users:", error);
        setError("No fue posible cargar los clientes.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [token]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-slate-400">
        Cargando clientes...
      </div>
    );
  }

  return (
    <div className="p-6 text-white">
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Clientes</h1>
        <p className="text-slate-400 mt-1">Gestión de usuarios registrados</p>
      </div>

      {/* TABLE WRAPPER */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-lg">
        {error ? (
          <div className="border-b border-red-500/30 bg-red-500/10 px-5 py-4 text-red-300">
            {error}
          </div>
        ) : null}
        {/* TOP BAR (opcional visual pro) */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800">
          <p className="text-slate-400 text-sm">
            Total:{" "}
            <span className="text-cyan-400 font-semibold">{users.length}</span>
          </p>
            <p className="text-slate-500 text-xs">Solo clientes registrados</p>

        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            {/* HEADER */}
            <thead className="text-slate-400 text-sm border-b border-slate-800 bg-slate-950/40">
              <tr>
                <th className="p-4 font-medium">Nombre</th>
                <th className="p-4 font-medium">Email</th>
                <th className="p-4 font-medium">Teléfono</th>
                <th className="p-4 font-medium">Rol</th>
              </tr>
            </thead>

            {/* BODY */}
            <tbody>
              {users.map((user) => (
                <tr
                  key={user.id}
                  className="border-b border-slate-800 hover:bg-slate-800/50 transition"
                >
                  <td className="p-4 font-medium text-white">{user.name}</td>

                  <td className="p-4 text-slate-300">{user.email}</td>

                  <td className="p-4 text-slate-300">{user.phone || "—"}</td>

                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold
                      ${
                        user.role === "ADMIN"
                          ? "bg-cyan-500/20 text-cyan-400"
                          : "bg-slate-800 text-slate-300"
                      }
                    `}
                    >
                      {user.role}
                    </span>
                  </td>
                </tr>
              ))}

              {users.length === 0 && (
                <tr>
                  <td colSpan="4" className="p-10 text-center text-slate-500">
                    No hay clientes registrados
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
