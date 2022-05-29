const Area = require('../models/Area');

// Validar si el Area no Existe
const areaExist = async (area = '') => {
    const areaExists = await Area.findById( area );
    if (!areaExists) {
        throw new Error('El Area no existe');
    }
}

module.exports =  {
    areaExist
}
