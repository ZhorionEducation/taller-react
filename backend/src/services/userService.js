const repository = require("../repositories/userRepository");

const getAllUsers = async () => {
    return await repository.getAllUsers();
};

const getUserById = async (id) => {
    return await repository.getUserById(id);
}

module.exports = {
    getAllUsers,
    getUserById
};