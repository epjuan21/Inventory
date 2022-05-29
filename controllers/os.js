const { handleHttpError, handleHttpSuccess } = require("../lib/handleHttpResponse");
const Os = require("../models/Os");

// Obtener todos los Sistemas Operativos
const getOs = async (req, res) => {
    try {
        const os = await Os.find({ state: true });
        if (!os) return handleHttpError(res, `No hay sistemas operativos`, 404);
        handleHttpSuccess(res, os, 200);
    } catch (error) {
        handleHttpError(res, error.message, 500);
    }
}

// Crear Sistema Operativo
const createOs = async (req, res) => {
    try {
        const { licence, version, barcode, serial, workstation, availability, consecutive } = req.body;
        const newOs = new Os({ licence, version, barcode, serial, workstation, availability, consecutive });
        const osSaved = await newOs.save();
        handleHttpSuccess(res, osSaved, 201);
    } catch (error) {
        handleHttpError(res, error.message, 500);
    }
}

module.exports = {
    getOs,
    createOs
}
