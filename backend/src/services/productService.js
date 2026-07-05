const repository = require("../repositories/productRepository");

const getAllProducts = async () => {
  return await repository.getAllProducts();
}

const getProductById = async (id) => {
  return await repository.getProductById(id);
}

const createProduct = async (name, description, image, price, stock) => {
  const result = await repository.createProduct(name, description, image, price, stock);
  return { message: "Producto creado exitosamente", productId: result.insertId };
}

const updateProduct = async (id, name, description, image, price, stock) => {
  const result = await repository.updateProduct(id, name, description, image, price, stock);
  return { message: "Producto actualizado exitosamente", productId: result.insertId };
}

const deleteProduct = async (id) => {
  const result = await repository.deleteProduct(id);
  return { message: "Producto eliminado exitosamente", productId: result.insertId };
}

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};