const { handleHttpError, handleHttpSuccess } = require('../lib/handleHttpResponse');
const Area = require('../models/Area');

// Obtener todas las areas
const getAreas = async(req, res) => {
    try {
        const areas = await Area.find({ state: true });
        if (!areas) return handleHttpError(res, `No hay areas`, 404);
        handleHttpSuccess(res, areas, 200);
    } catch (error) {
        handleHttpError(res, error.message, 500);
    }
}

// Crear Area
const createArea = async (req, res) => {

        try {
            const { name } = req.body;
            const newArea = new Area({ name });
            const areaSaved = await newArea.save();
            handleHttpSuccess(res, areaSaved, 201);
        } catch (error) {
            handleHttpError(res, error.message, 500);
        }
}

// Actualizar Area
const updateArea = async (req, res) => {
    try {
        const { name } = req.body;
        const { id } = req.params;
        const areaUpdated = await Area.findByIdAndUpdate(id, { name }, { new: true });
        if (!areaUpdated) return handleHttpError(res, `No se encontró el area`, 404);
        handleHttpSuccess(res, areaUpdated, 200);
    } catch (error) {
        handleHttpError(res, error.message, 500);
    }
}

// Eliminar Area
const deleteArea = async (req, res) => {
    try {
        const { id } = req.params;
        const area = await Area.findByIdAndUpdate(id, { state: false}, { new: true });
        if (!area) return handleHttpError(res, `No se encontró el area`, 404);
        handleHttpSuccess(res, area, 200);
    } catch (error) {
        handleHttpError(res, error.message, 500);
    }
}

module.exports = {
    getAreas,
    createArea,
    updateArea,
    deleteArea
}
