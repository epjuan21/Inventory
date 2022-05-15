const bcrypt = require('bcrypt');
const response = require('../network/response');
const User = require("../models/User");

const getUserById = async (req, res) => {

    try {
        const user = await User.findById(req.params.id, { password: 0 });
        if (!user) return response.error(req, res, `El usuario no existe`, 404);

        response.success(req, res, user, 200);

    } catch (error) {
        response.error(req, res, error.message, 500);
    }
}

const getUsers = async (req, res) => {

    try {
        const users = await User.find({ state: true }, { password: 0 });

        if (!users) return response.error(req, res, `No hay usuarios`, 404);

        response.success(req, res, users, 200);

    } catch (error) {
        response.error(req, res, error.message, 500);
    }
}

const updateUser = async (req, res) => {

    try {
        // Vertificar que el usuario existe
        const user = await User.findById(req.params.id);
        if (!user) return response.error(req, res, `El usuario no existe`, 404);

        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        // Actualizar Password
        if (req.body.password) {
            const salt = await bcrypt.genSalt(10)
            updatedUser.password = await bcrypt.hash(req.body.password, salt)
        }

        response.success(req, res, updatedUser, 200);

    } catch (error) {
        response.error(req, res, error.message, 500);
    }
}

const deleteUser = async (req, res) => {

    try {
        // Vertificar que el usuario existe
        const user = await User.findById(req.params.id);
        if (!user) return response.error(req, res, `El usuario no existe`, 404);

        const deletedUser = await User.findByIdAndUpdate(req.params.id, { state: false }, { new: true });

        response.success(req, res, deletedUser, 200);

    } catch (error) {
        response.error(req, res, error.message, 500);
    }
}

module.exports = {
    getUserById,
    getUsers,
    updateUser,
    deleteUser
}
