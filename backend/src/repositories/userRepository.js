const db = require("../config/db");

const getAllUsers = async () => {
    const [rows] = await db.query(
        `
        SELECT
            id,
            name,
            email,
            phone,
            address,
            role,
            created_at
        FROM users
        `
    );

    return rows;
};

const getUserById = async (id) => {
    const [rows] = await db.query(
        `
        SELECT
            id,
            name,
            email,
            phone,
            address,
            role,
            created_at
        FROM users
        WHERE id = ?
        `,
        [id]
    );
    return rows[0];
};

module.exports = {
    getAllUsers,
    getUserById
};