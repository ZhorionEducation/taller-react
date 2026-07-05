const orderRepository = require("../repositories/orderRepository");
const productRepository = require("../repositories/productRepository");

const createOrder = async (userId, products) => {
    let total = 0;
    for (const product of products) {
        const productData = await productRepository.getProductById(product.productId);
        if (!productData) {
            throw new Error(`Producto con ID ${product.productId} no encontrado`);
        }
        total += productData.price * product.quantity;
    }

    const orderId = await orderRepository.createOrder(userId, total);
    for (const product of products) {
        const productData = await productRepository.getProductById(product.productId);
        await orderRepository.createOrderDetail(orderId, product.productId, product.quantity, productData.price);
    }
    
    return { message: "Orden creada exitosamente", orderId, total };
};

const getOrdersByUserId = async (userId) => {
    return await orderRepository.getOrdersByUserId(userId);
}

const getOrderById = async (id) => {
    const order = await orderRepository.getOrderById(id);
    if (!order) {
        throw new Error(`Orden con ID ${id} no encontrada`);
    }
    const details = await orderRepository.getOrderDetails(id);
    return { ...order, details };
}

const getAllOrders = async () => {
    return await orderRepository.getAllOrders();
}

const updateOrderStatus = async (orderId, status) => {
    const order = await orderRepository.getOrderById(orderId);
    if (!order) {
        throw new Error(`Orden con ID ${orderId} no encontrada`);
    }
    const validStatuses = ["PENDIENTE", "APROBADO", "RECHAZADO", "ENVIADO", "ENTREGADO"];
    if (!validStatuses.includes(status)) {
        throw new Error(`Estado inválido. Los estados válidos son: ${validStatuses.join(", ")}`);
    }
    await orderRepository.updateOrderStatus(orderId, status);
    return { message: "Estado de la orden actualizado exitosamente", orderId, status };

}

module.exports = {
    createOrder,
    getOrdersByUserId,
    getOrderById,
    getAllOrders,
    updateOrderStatus
};
