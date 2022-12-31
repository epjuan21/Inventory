const Os = require("../models/Os");

// Verificar si el Sistema Operativo Existe
const osExist = async (id = '') => {
    const osExists = await Os.findById(id);
    if (!osExists) {
        throw new Error('El Sistema Operativo no existe');
    }
}

// Verificar si el Sistema Operativo esta disponible
const osAvailable = async (id = '') => {
    const osAvailable = await Os.findById(id);
    if (!osAvailable.availability) {
        throw new Error('El Sistema Operativo no esta disponible');
    }
}

// Verificar si el Sistema Operativo esta eliminado
const osDeleted = async (id = '') => {
    const osDeleted = await Os.findById(id);
    if (!osDeleted.state) {
        throw new Error('El Sistema Operativo esta eliminado');
    }
}

// Verifiar si el Serial Existe
const serialExist = async (serial = '') => {
    const serialExists = await Os.findOne({ serial });
    if (serialExists) {
        throw new Error('El Serial ya existe');
    }
}

module.exports = {
    osExist,
    osAvailable,
    osDeleted,
    serialExist
}
