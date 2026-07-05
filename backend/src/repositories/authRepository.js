// este archivo es el que habla con la base de datos y hace las consultas

const db = require("../config/db");

const findByEmail = async (email) => {
  const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
  return rows[0];
}

const createUser = async (
    name,
    email,
    password,
    phone,
    address,
    role
) => {
  const [result] = await db.query(
    "INSERT INTO users (name, email, password, phone, address, role) VALUES (?, ?, ?, ?, ?, ?)",
    [name, email, password, phone, address, role]
  );
  return result
}

module.exports = {
  findByEmail,
  createUser
};
