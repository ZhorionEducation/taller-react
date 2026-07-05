const service = require("../services/orderService");

const createOrder = async (req, res) => {
    try {
        const result = await service.createOrder(req.user.id, req.body.products);
        res.status(201).json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getOrdersByUserId = async (req, res) => {
    try {
        const orders = await service.getOrdersByUserId(req.user.id);
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getOrderById = async (req, res) => {
    try {
        const order = await service.getOrderById(req.params.id);
        if (!order) {
            return res.status(404).json({ error: "Orden no encontrada" });
        }
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getAllOrders = async (req, res) => {
    try {
        const orders = await service.getAllOrders();
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateOrderStatus = async (req, res) => {
    try {
        const result = await service.updateOrderStatus(req.params.id, req.body.status);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    createOrder,
    getOrdersByUserId,
    getOrderById,
    getAllOrders,
    updateOrderStatus
};