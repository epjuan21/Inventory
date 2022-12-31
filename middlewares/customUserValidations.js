const { handleHttpError } = require("../lib/handleHttpResponse");
const User = require("../models/User");
const Role = require("../models/Role");

// Verificar si el Email Existe
// Validación usada para el registro de un nuevo usuario
const emailExist = async (email = '') => {
    const emailExists = await User.findOne({ email });
    if (emailExists) {
        throw new Error('El Email ya Existe');
    }
}

// Verificar si el Email No Existe
// Validación usada para el login de un usuario
const emailNotExist = async (email = '') => {
    const emailExists = await User.findOne({ email });
    if (!emailExists) {
        throw new Error('El Email no Existe');
    }
}

// Verificar si el Usuario Existe por ID
const userExist = async (id = '') => {
    const userExists = await User.findById(id);
    if (!userExists) {
        throw new Error('El Usuario no existe');
    }
}

// Middleware para verificar si el usuario esta activo
const isActive = async (req, res, next) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user.state) return handleHttpError(res, `El usuario ${user.email} esta inactivo`, 401);
    next();
}

// Middleware para verificar si el Password es correcto
const isPasswordCorrect = async (req, res, next) => {
    const { password } = req.body;
    const { email } = req.body;
    const user = await User.findOne({ email });
    const isPasswordCorrect = await User.comparePassword(password, user.password);
    if (!isPasswordCorrect) return handleHttpError(res, `El Password es incorrecto`, 401);
    next();
}

// Verificar si el Rol Existe
const roleExist = async (role = '') => {
    const roleExists = await Role.findOne({ role });
    if (!roleExists) {
        throw new Error('El Rol no existe');
    }
}

// Middleware para verificar si el usuario tiene el rol de Administrador
const isAdmin = async (req, res, next) => {
    const { email } = req.user; // Se obtiene gracias a que en el middleware validateTokenJWT se asigna el usuario al request
    const user = await User.findOne({ email });
    if (user.role !== 'ADMIN_ROLE') return handleHttpError(res, `El usuario ${user.email} no tiene el rol de Administrador`, 401);
    next();
}

// Middleware para verificar si el usuario esta confirmado
const isConfirmed = async (req, res, next) => {
    const { email } = req.body;
    const user = await User.findOne({email});
    if(!user.confirmed) return handleHttpError(res, `El usuario ${user.email} no esta confirmado`, 401);
    next()
}

module.exports = {
    emailExist,
    emailNotExist,
    userExist,
    isActive,
    isPasswordCorrect,
    roleExist,
    isAdmin,
    isConfirmed
}
