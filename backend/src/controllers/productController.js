const service = require("../services/productService");

const getAllProducts = async (req, res) => {
    try {
        const products = await service.getAllProducts();
        res.status(200).json(products);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getProductById = async (req, res) => {
    try {
        const product = await service.getProductById(req.params.id);
        if (!product) {
            return res.status(404).json({ error: "Producto no encontrado" });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createProduct = async (req, res) => {
    try {
        const { name, description, image, price, stock } = req.body;
        const imagePath = req.file ? `/imagenes/${req.file.filename}` : image;
        const result = await service.createProduct(name, description, imagePath, price, stock);
        res.status(201).json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const updateProduct = async (req, res) => {
    try {
        const { name, description, image, price, stock } = req.body;
        const imagePath = req.file ? `/imagenes/${req.file.filename}` : image;
        const result = await service.updateProduct(req.params.id, name, description, imagePath, price, stock);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const result = await service.deleteProduct(req.params.id);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};
