const db = require("../config/db");

const getAllProducts = async () => {
  const [rows] = await db.query(
    `
    SELECT
        id,
        name,
        description,
        image,
        price,
        stock,
        created_at
    FROM products
    `
  );
  return rows;
};

const getProductById = async (id) => {
  const [rows] = await db.query(
    `
    SELECT
        id,
        name,
        description,
        image,
        price,
        stock,
        created_at
    FROM products
    WHERE id = ?
    `,
    [id]
  );
  return rows[0];
}

const createProduct = async (name, description, image, price, stock) => {
  const [result] = await db.query(
    "INSERT INTO products (name, description, image, price, stock) VALUES (?, ?, ?, ?, ?)",
    [name, description, image, price, stock]
  );
  return result;
};

const updateProduct = async (id, name, description, image, price, stock) => {
  const [result] = await db.query(
    "UPDATE products SET name = ?, description = ?, image = ?, price = ?, stock = ? WHERE id = ?",
    [name, description, image, price, stock, id]
  );
  return result;
}

const deleteProduct = async (id) => {
  const [result] = await db.query(
    "DELETE FROM products WHERE id = ?",
    [id]
  );
  return result;
}

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};
