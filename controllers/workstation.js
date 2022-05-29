const { handleHttpSuccess, handleHttpError } = require("../lib/handleHttpResponse");
const Workstation = require("../models/Workstation");

// Obtener todos los workstations
const getWorkstations = async (req, res) => {
    try {
        const workstations = await Workstation.aggregate(
            [
                {
                    $lookup: {
                        from: "areas",
                        localField: "area",
                        foreignField: "_id",
                        as: "area"
                    }
                },
                { $unwind: "$area" },
                {
                    $project: {
                        _id: 0,
                        name: 1,
                        description: 1,
                        brand: 1,
                        status: 1,
                        location: 1,
                        area: "$area.name",
                        reference: 1,
                        serial: 1,
                        plaque: 1,
                        board: 1,
                        processor: 1,
                        ram: 1,
                        storage: 1,
                        networkcardboard: 1,
                        pcinetworkboard: 1,
                        computername: 1,
                        fullnamecomputer: 1,
                        computerdescription: 1,
                        domain: 1,
                        localuser: 1,
                        domainuser: 1,
                        networkpoint: 1,
                        patchpanel: 1,
                        xencokey: 1,
                        remoteuser: 1,
                        dateofpurchase: 1,
                        purchasevalue: 1,
                        addressanydesk: 1,
                        anydeskpassword: 1
                    }
                }
            ]
        );

        if (!workstations) return handleHttpError(res, `No hay Estaciones de Trabajo`, 404);
        handleHttpSuccess(res, workstations, 200);
    } catch (error) {
        handleHttpError(res, error.message, 500);
    }
}

// Crear Workstation
const createWorkstation = async (req, res) => {

    try {
        const { name, description, brand, status, location, area, reference, serial, plaque, board, processor, ram, storage, networkcardboard, pcinetworkboard, computername, fullnamecomputer, computerdescription, domain, localuser, domainuser, networkpoint, patchpanel, xencokey, remoteuser, dateofpurchase, purchasevalue, addressanydesk, anydeskpassword } = req.body;
        const newWorkstation = new Workstation({ name, description, brand, status, location, area, reference, serial, plaque, board, processor, ram, storage, networkcardboard, pcinetworkboard, computername, fullnamecomputer, computerdescription, domain, localuser, domainuser, networkpoint, patchpanel, xencokey, remoteuser, dateofpurchase, purchasevalue, addressanydesk, anydeskpassword });
        const workstationSaved = await newWorkstation.save();
        handleHttpSuccess(res, workstationSaved, 201);
    } catch (error) {
        handleHttpError(res, error.message, 500);
    }
}

// Eliminar Todas las Estaciones de Trabajo
const deleteAllWorkstations = async (req, res) => {
    try {
        const workstations = await Workstation.deleteMany({});
        if (!workstations) return handleHttpError(res, `No hay Estaciones de Trabajo`, 404);
        handleHttpSuccess(res, workstations, 200);
    } catch (error) {
        handleHttpError(res, error.message, 500);
    }
}

module.exports = {
    createWorkstation,
    getWorkstations,
    deleteAllWorkstations
}
