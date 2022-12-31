const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const WorkstationSchema = new Schema({

    name: {
        type: String,
        unique: [true, "El nombre debe ser único"],
        trim: true,
        required: [true, "El nombre es requerido"],
        minlength: [4, "El nombre debe tener más de 4 caracteres"],
        maxlength: [100, "El nombre debe tener menos de 100 caracteres"]
    },
    description: {
        type: String,
        trim: true,
        required: [true, "La descripción es requerida"],
        minlength: [4, "La descripción debe tener más de 4 caracteres"],
        maxlength: [100, "La descripción debe tener menos de 100 caracteres"]
    },
    brand: {
        type: String,
        required: true,
        trim: true,
        minlength: [2, "La marca debe tener más de 1 caracter"],
        maxlength: [100, "La marca debe tener menos de 100 caracteres"],
        default: "SIN MARCA"
    },
    status: {
        type: String,
        required: [true, "El estado es requerido"],
        default: "DISPONIBLE",
        enum: ['DISPONIBLE', 'EN USO', 'DAÑADO', 'EN REPARACIÓN', 'EN PROCESO DE BAJA']
    },
    location: {
        type: String,
        trim: true,
        required: [true, "La ubicación es requerida"],
        minlength: [4, "La ubicación debe tener más de 4 caracteres"],
        maxlength: [100, "La ubicación debe tener menos de 100 caracteres"]
    },
    area: {
        type: mongoose.Types.ObjectId,
        ref : 'Area',
    },
    reference: {
        type: String,
        required: true,
        trim: true,
        minlength: [4, "La referencia debe tener mas de 4 caracteres"],
        maxlength: [100, "La referencia debe tener menos de 100 caracteres"],
        default: "SIN REFERNCIA"
    },
    serial: {
        type: String,
        required: true,
        trim: true,
        minlength: [4, "El serial debe tener mas de 4 caracteres"],
        maxlength: [100, "El serial debe tener menos de 100 caracteres"],
        default: "SIN SERIAL"
    },
    plaque: {
        type: String,
        unique: [true, "La placa debe ser única"],
        trim: true,
        minlength: [4, "La placa debe tener más de 3 caracteres"],
        maxlength: [100, "La placa debe tener menos de 100 caracteres"],
        default: "SIN PLACA"
    },
    board: {
        type: String,
        required: [true, "La Board es requerida"],
        trim: true,
        minlength: [4, "La Board debe tener más de 4 caracteres"],
        maxlength: [100, "La Board debe tener menos de 100 caracteres"],
        default: "SIN INFORMACIÓN"
    },
    processor: {
        type: String,
        required: [true, "El procesador es requerido"],
        trim: true,
        minlength: [4, "El procesador debe tener más de 4 caracteres"],
        maxlength: [100, "El procesador debe tener menos de 100 caracteres"],
        default: "SIN INFORMACIÓN"
    },
    ram: {
        type: String,
        required: [true, "La RAM es requerida"],
        trim: true,
        minlength: [4, "La RAM debe tener más de 4 caracteres"],
        maxlength: [100, "La RAM debe tener menos de 100 caracteres"],
        default: "SIN INFORMACIÓN"
    },
    storage: {
        type: String,
        required: [true, "El almacenamiento es requerido"],
        trim: true,
        minlength: [4, "El almacenamiento debe tener más de 4 caracteres"],
        maxlength: [100, "El almacenamiento debe tener menos de 100 caracteres"],
        default: "SIN INFORMACIÓN"
    },
    networkcardboard: {
        type: String,
        required: [true, "La tarjeta de red es requerida"],
        trim: true,
        minlength: [4, "La tarjeta de red debe tener más de 4 caracteres"],
        maxlength: [100, "La tarjeta de red debe tener menos de 100 caracteres"],
        default: "SIN INFORMACIÓN"
    },
    pcinetworkboard: {
        type: String,
        trim: true,
        minlength: [4, "La placa de red debe tener más de 4 caracteres"],
        maxlength: [100, "La placa de red debe tener menos de 100 caracteres"],
        default: "NO TIENE"
    },
    computername: {
        type: String,
        required: [true, "El nombre del computador es requerido"],
        minlength: [4, "El nombre del computador debe tener más de 4 caracteres"],
        maxlength: [100, "El nombre del computador debe tener menos de 100 caracteres"],
        default: "SIN INFORMACIÓN"
    },
    fullnamecomputer: {
        type: String,
        required: [true, "El nombre completo del computador es requerido"],
        minlength: [4, "El nombre completo del computador debe tener más de 4 caracteres"],
        maxlength: [100, "El nombre completo del computador debe tener menos de 100 caracteres"],
        default: "SIN INFORMACIÓN"
    },
    computerdescription: {
        type: String,
        required: [true, "La descripción del computador es requerida"],
        trim: true,
        minlength: [4, "La descripción del computador debe tener más de 4 caracteres"],
        maxlength: [100, "La descripción del computador debe tener menos de 100 caracteres"],
        default: "SIN INFORMACIÓN"
    },
    domain: {
        type: String,
        required: [true, "El dominio es requerido"],
        trim: true,
        minlength: [4, "El dominio debe tener más de 4 caracteres"],
        maxlength: [100, "El dominio debe tener menos de 100 caracteres"],
        default: "SIN INFORMACIÓN"
    },
    localuser: {
        type: String,
        required: [true, "El usuario local es requerido"],
        trim: true,
        minlength: [4, "El usuario local debe tener más de 4 caracteres"],
        maxlength: [100, "El usuario local debe tener menos de 100 caracteres"],
        default: "SIN INFORMACIÓN"
    },
    domainuser: {
        type: String,
        required: [true, "El usuario del dominio es requerido"],
        trim: true,
        minlength: [4, "El usuario del dominio debe tener más de 4 caracteres"],
        maxlength: [100, "El usuario del dominio debe tener menos de 100 caracteres"],
        default: "SIN INFORMACIÓN"
    },
    networkpoint: {
        type: String,
        required: [true, "El punto de red es requerido"],
        trim: true,
        minlength: [4, "El punto de red debe tener más de 4 caracteres"],
        maxlength: [100, "El punto de red debe tener menos de 100 caracteres"],
        default: "SIN INFORMACIÓN"
    },
    patchpanel: {
        type: String,
        required: [true, "El panel de patch es requerido"],
        trim: true,
        minlength: [1, "El panel de patch debe tener más de 1 caracteres"],
        maxlength: [15, "El panel de patch debe tener menos de 16 caracteres"],
        default: "SIN INFORMACIÓN"
    },
    xencokey: {
        type: Boolean,
        required: [true, "La llave de xenco es requerida"],
        default: false
    },
    remoteuser: {
        type: String,
        required: [true, "El usuario remoto es requerido"],
        trim: true,
        minlength: [4, "El usuario remoto debe tener más de 4 caracteres"],
        maxlength: [100, "El usuario remoto debe tener menos de 100 caracteres"],
        default: "SIN INFORMACIÓN"
    },
    dateofpurchase: {
        type: String,
        trim: true,
        minlength: [10, "La fecha de compra debe tener 10 caracteres"],
        maxlength: [10, "La fecha de compra debe tener máximo 10 caracteres"],
        default: "1970-01-01"
    },
    purchasevalue: {
        type: Number,
        required: [true, "El valor de compra es requerido"],
        min: [0, "El valor de compra debe ser mayor a 0"],
        default: 0
    },
    addressanydesk: {
        type: String,
        required: [true, "La direccion de anydesk es requerida"],
        trim: true,
        minlength: [4, "La direccion de anydesk debe tener más de 4 caracteres"],
        maxlength: [100, "La direccion de anydesk debe tener menos de 100 caracteres"],
        default: "SIN INFORMACIÓN"
    },
    anydeskpassword: {
        type: String,
        required: [true, "La contraseña de anydesk es requerida"],
        minlength: [4, "La contraseña de anydesk debe tener más de 4 caracteres"],
        maxlength: [100, "La contraseña de anydesk debe tener menos de 100 caracteres"],
        default: "SIN INFORMACIÓN"
    },
    eventos: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Event"
        }
    ]

}
    , { versionKey: false, timestamps: true }
);

module.exports = model('Workstation', WorkstationSchema);
