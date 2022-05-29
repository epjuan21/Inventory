const path = require("path");
const fs = require('fs');
const cloudinary = require('cloudinary').v2;

cloudinary.config(process.env.CLOUDINARY_URL);

// Upload Image To Cloudinary to Especific Folder
const uploadImage = async (image, folder) => {
    try {
        const result = await cloudinary.uploader.upload(image, {
            folder,
            use_filename: true,
            unique_filename: false
        });
        return result;
    } catch (error) {
        throw new Error(error);
    }
}

// Limpiar Imagenes de Carpeta Temporal del Servidor
const clearTemp = async (image) => {
    try {
        const pathImage = path.join(__dirname, '../', image);
        // Verificar Existencia de Imagen en la Ruta
        if (fs.existsSync(pathImage)) {
            fs.unlinkSync(pathImage);
        }
    } catch (error) {
        throw new Error(error);
    }
}

module.exports = {
    uploadImage,
    clearTemp
}
