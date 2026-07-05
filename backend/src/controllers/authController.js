// este archivo recibe las peticiones y responde

const service = require("../services/authService");

const isBlank = (value) => !value || String(value).trim() === "";

const register = async (req, res) => {
    try {
        // Validamos los campos antes de llamar al servicio.
        const { name, email, password, phone, address } = req.body;
        if ([name, email, password, phone, address].some(isBlank)) {
            return res.status(400).json({ error: "Todos los campos son obligatorios" });
        }
        const result = await service.register(name, email, password, phone, address);
        res.status(201).json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const login = async (req, res) => {
    try {
        // Validación básica del login.
        const { email, password } = req.body;
        if ([email, password].some(isBlank)) {
            return res.status(400).json({ error: "Email y contraseña son obligatorios" });
        }
        const result = await service.login(email, password);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const registerAdmin = async (req, res) => {
    try {
        // Registro de un administrador nuevo.
        const { name, email, password, phone, address } = req.body;
        if ([name, email, password, phone, address].some(isBlank)) {
            return res.status(400).json({ error: "Todos los campos son obligatorios" });
        }
        const result = await service.registerAdmin(name, email, password, phone, address);
        res.status(201).json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = {
    register,
    login,
    registerAdmin
};
