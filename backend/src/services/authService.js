// este archivo es la logica del negocio 

const repository = require("../repositories/authRepository");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const normalize = (value) => String(value || "").trim();

const register = async (name, email, password, phone, address) => {
    // Limpiamos datos antes de guardarlos.
    name = normalize(name);
    email = normalize(email);
    password = normalize(password);
    phone = normalize(phone);
    address = normalize(address);

    if (!name || !email || !password || !phone || !address) {
        throw new Error("Todos los campos son obligatorios");
    }

    // Revisamos si el correo ya existe.
    const user = await repository.findByEmail(email);
    if (user) {
        throw new Error("El usuario ya existe");
    }
    // Guardamos la contraseña cifrada.
    const hashedPassword = await bcrypt.hash(password, 10);
    await repository.createUser(name, email, hashedPassword, phone, address, "CLIENT");
    return { message: "Usuario registrado exitosamente" };
}

const login = async (email, password) => {
    // Quitamos espacios para evitar errores de validación.
    email = normalize(email);
    password = normalize(password);

    if (!email || !password) {
        throw new Error("Email y contraseña son obligatorios");
    }

    // Buscamos el usuario por correo.
    const user = await repository.findByEmail(email);
    if (!user) {
        throw new Error("El usuario no existe");
    }

    // Comparamos la contraseña enviada con la guardada.
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
        throw new Error("Contraseña incorrecta");
    }

    // Generamos el token para la sesión.
    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });
    return {
        token,
        role: user.role,

     };
};

const registerAdmin = async (name, email, password, phone, address) => {
    // Mismo flujo que el registro normal, pero con rol ADMIN.
    name = normalize(name);
    email = normalize(email);
    password = normalize(password);
    phone = normalize(phone);
    address = normalize(address);

    if (!name || !email || !password || !phone || !address) {
        throw new Error("Todos los campos son obligatorios");
    }

    const user = await repository.findByEmail(email);
    if (user) {
        throw new Error("El usuario ya existe");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await repository.createUser(name, email, hashedPassword, phone, address, "ADMIN");
    return { message: "Usuario administrador registrado exitosamente" };
}

module.exports = {
    register,
    login,
    registerAdmin
};