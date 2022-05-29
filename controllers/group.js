const { handleHttpError, handleHttpSuccess } = require("../lib/handleHttpResponse");
const Group = require("../models/Group");

// Obtener todos los grupos
const getGroups = async (req, res) => {
    try {
        const groups = await Group.find({ state: true });
        if (!groups) return handleHttpError(res, `No hay grupos`, 404);
        handleHttpSuccess(res, groups, 200);
    } catch (error) {
        handleHttpError(res, error.message, 500);
    }
}

// Crear Grupo
const createGroup = async (req, res) => {
    try {
        const { name} = req.body;
        const newGroup = new Group({ name });
        const groupSaved = await newGroup.save();
        handleHttpSuccess(res, groupSaved, 201);
    } catch (error) {
        handleHttpError(res, error.message, 500);
    }
}

// Actualizar Grupo
const updateGroup = async (req, res) => {
    try {
        const { name } = req.body;
        const { id } = req.params;
        const groupUpdated = await Group.findByIdAndUpdate(id, { name }, { new: true });
        if (!groupUpdated) return handleHttpError(res, `No se encontró el grupo`, 404);
        handleHttpSuccess(res, groupUpdated, 200);
    } catch (error) {
        handleHttpError(res, error.message, 500);
    }
}

// Eliminar Grupo
const deleteGroup = async (req, res) => {
    try {
        const { id } = req.params;
        const group = await Group.findByIdAndUpdate(id, { state: false}, { new: true });
        if (!group) return handleHttpError(res, `No se encontró el grupo`, 404);
        handleHttpSuccess(res, group, 200);
    } catch (error) {
        handleHttpError(res, error.message, 500);
    }
}

module.exports = {
    getGroups,
    createGroup,
    updateGroup,
    deleteGroup
}
