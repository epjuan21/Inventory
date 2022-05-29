const { handleHttpError, handleHttpSuccess } = require("../lib/handleHttpResponse");
const Role = require("../models/Role");

// Obtener todos los roles
const getRoles = async(req, res) => {
    try {
        const roles = await Role.find({});
        if (!roles) return handleHttpError(res, `No hay roles`, 404);
        handleHttpSuccess(res, roles, 200);
    } catch (error) {
        handleHttpError(res, error.message, 500);
    }
}

// Crear Role
const createRole = async (req, res) => {

    try {
        const { role } = req.body;
        const newRole = new Role({ role });
        const roleSaved = await newRole.save();
        handleHttpSuccess(res, roleSaved, 201);
    } catch (error) {
        handleHttpError(res, error.message, 500);
    }
}

module.exports = {
    getRoles,
    createRole
}
