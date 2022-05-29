const { handleHttpError, handleHttpSuccess } = require("../lib/handleHttpResponse");
const Type = require("../models/Type");


// Obtener todos los Types
const getTypes = async (req, res) => {
    try {
        const types = await Type.find({ state: true });
        if (!types) return handleHttpError(res, `No hay types`, 404);
        handleHttpSuccess(res, types, 200);
    } catch (error) {
        handleHttpError(res, error.message, 500);
    }
}

// Crear Type
const createType = async (req, res) => {
    try {
        const { name } = req.body;
        const newType = new Type({ name });
        const typeSaved = await newType.save();
        handleHttpSuccess(res, typeSaved, 201);
    } catch (error) {
        handleHttpError(res, error.message, 500);
    }
}

// Actualizar Type
const updateType = async (req, res) => {
    try {
        const { name } = req.body;
        const { id } = req.params;
        const typeUpdated = await Type.findByIdAndUpdate(id, { name }, { new: true });
        if (!typeUpdated) return handleHttpError(res, `No se encontró el type`, 404);
        handleHttpSuccess(res, typeUpdated, 200);
    } catch (error) {
        handleHttpError(res, error.message, 500);
    }
}

// Eliminar Type
const deleteType = async (req, res) => {
    try {
        const { id } = req.params;
        const type = await Type.findByIdAndUpdate(id, { state: false }, { new: true });
        if (!type) return handleHttpError(res, `No se encontró el type`, 404);
        handleHttpSuccess(res, type, 200);
    } catch (error) {
        handleHttpError(res, error.message, 500);
    }
}

module.exports = {
    getTypes,
    createType,
    updateType,
    deleteType
}
