const { uploadImage, clearTemp, deleteImage } = require("../lib/cloudinary");
const { handleHttpError, handleHttpSuccess } = require("../lib/handleHttpResponse");
const Os = require("../models/Os");

// Obtener todos los Sistemas Operativos
const getOs = async (req, res) => {
    try {
        // const os = await Os.find({ state: true });
        const os = await Os.aggregate(
            [
                {
                    $lookup: {
                        from: "workstations",
                        localField: "workstation_id",
                        foreignField: "_id",
                        as: "workstation"
                    }
                },
                { $unwind: "$workstation" },
                {
                    $project: {
                        _id: 0,
                        licence: 1,
                        version: 1,
                        barcode: 1,
                        serial: 1,
                        workstation: "$workstation.description",
                        availability: 1,
                        consecutive: 1,
                        image: 1
                    }
                }
            ]
        )
        if (!os) return handleHttpError(res, `No hay sistemas operativos`, 404);
        handleHttpSuccess(res, os, 200);
    } catch (error) {
        handleHttpError(res, error.message, 500);
    }
}

// Crear Sistema Operativo
const createOs = async (req, res) => {
    try {
        const { licence, version, barcode, serial, workstation_id, availability, consecutive } = req.body;
        const newOs = new Os({ licence, version, barcode, serial, workstation_id, availability, consecutive });

        // Subir Imagen a Cloudinary
        if (req.files.image) {
            const image = req.files.image;
            const result = await uploadImage(image.tempFilePath, "os");
            newOs.image = {
                secure_url: result.secure_url,
                public_id: result.public_id
            }
            // Limpiar Carpeta Temporal
            clearTemp(image.tempFilePath);
        }

        const osSaved = await newOs.save();
        handleHttpSuccess(res, osSaved, 201);
    } catch (error) {
        handleHttpError(res, error.message, 500);
    }
}

// Eliminar Sistema Operativo
const deleteOs = async (req, res) => {
    try {
        const { id } = req.params;
        const os = await Os.findByIdAndUpdate(id, { state: false });
        if (!os) return handleHttpError(res, `No se encontro el sistema operativo`, 404);

        // Eliminar Imagen de Cloudinary
        if (os.image) {
            const image = os.image;
            await deleteImage(image.public_id);
        }

        handleHttpSuccess(res, os, 200);
    } catch (error) {
        handleHttpError(res, error.message, 500);
    }
}

module.exports = {
    getOs,
    createOs,
    deleteOs
}
