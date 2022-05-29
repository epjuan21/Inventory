const bcrypt = require('bcrypt');
const { handleHttpError, handleHttpSuccess } = require('../lib/handleHttpResponse');
const User = require("../models/User");

const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id, { password: 0 });
        if (!user) return handleHttpError(res, `El usuario no existe`, 404);

        handleHttpSuccess(res, user, 200);

    } catch (error) {
        handleHttpError(res, error.message, 500);
    }
}

const getUsers = async (req, res) => {
    try {
        const users = await User.find({ state: true }, { password: 0 });
        if (!users) return handleHttpError(res, `No hay usuarios`, 404);
        handleHttpSuccess(res, users, 200);
    } catch (error) {
        handleHttpError(res, error.message, 500);
    }
}

const updateUser = async (req, res) => {

    try {

        const id = req.params.id;
        const { password, ...rest } = req.body;

        // Encriptar Contraseña
        if (password) {
            const salt = await bcrypt.genSalt(10);
            rest.password = await bcrypt.hash(password, salt);
        }

        // Vertificar que el usuario existe
        const user = await User.findById(id);
        if (!user) return handleHttpError(res, `El usuario no existe`, 404);

        const userUpdated = await User.findByIdAndUpdate(id, rest, { new: true });

        // Quitar Password de la respuesta
        userUpdated.password = undefined;

        handleHttpSuccess(res, userUpdated, 200);

    } catch (error) {
        handleHttpError(res, error.message, 500);
    }
}

const deleteUser = async (req, res) => {

    try {
        // Vertificar que el usuario existe
        const user = await User.findById(req.params.id);
        if (!user) return handleHttpError(res, `El usuario no existe`, 404);

        const deletedUser = await User.findByIdAndUpdate(req.params.id, { state: false }, { new: true });

        handleHttpSuccess(res, deletedUser, 200);

    } catch (error) {
        handleHttpError(res, error.message, 500);
    }
}

module.exports = {
    getUserById,
    getUsers,
    updateUser,
    deleteUser
}
