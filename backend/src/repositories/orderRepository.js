const db = require("../config/db");

const createOrder = async (userId, total) => {
    const [result] = await db.query(
        "INSERT INTO orders (user_id, total) VALUES (?, ?)",
        [userId, total]
    );
    return result.insertId;
};

const createOrderDetail = async (orderId, productId, quantity, price) => {
    await db.query(
        "INSERT INTO order_details (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)",
        [orderId, productId, quantity, price]
    );
}

const getOrdersByUserId = async (userId) => {
    const [rows] = await db.query(
        `
        SELECT
            id,
            total,
            status,
            created_at
        FROM orders
        WHERE user_id = ?
        ORDER BY created_at DESC
        `,
        [userId]
    );
    return rows;
}

const getOrderById = async (id) => {
    const [rows] = await db.query(
        `
        SELECT
            o.id,
            o.user_id,
            u.name AS user_name,
            u.email AS user_email,
            o.total,
            o.status,
            o.created_at
        FROM orders o
        INNER JOIN users u
            ON u.id = o.user_id
        WHERE o.id = ?
        `,
        [id]
    );
    return rows[0];
}

const getOrderDetails = async (orderId) => {
    const [rows] = await db.query(
        `
        SELECT
            od.product_id,
            p.name,
            od.quantity,
            od.price
        FROM order_details od
        INNER JOIN products p
            ON p.id = od.product_id
        WHERE od.order_id = ?
        `,
        [orderId]
    );

    return rows;
};

const getAllOrders = async () => {
    const [rows] = await db.query(
        `
        SELECT
            o.id,
            u.name AS user_name,
            o.total,
            o.status,
            o.created_at
        FROM orders o
        INNER JOIN users u
            ON u.id = o.user_id
        ORDER BY o.created_at DESC
        `
    );

    return rows;
};

const updateOrderStatus = async (orderId, status) => {
    const [result] = await db.query(
        "UPDATE orders SET status = ? WHERE id = ?",
        [status, orderId]
    );
    return result;
}

module.exports = {
    createOrder,
    createOrderDetail,
    getOrdersByUserId,
    getOrderById,
    getOrderDetails,
    getAllOrders,
    updateOrderStatus
};