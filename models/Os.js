const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const OsSchema = new Schema({

    licence: {
        type: String,
        trim: true,
        required: [true, "La licencia es requerida"],
        minlength: [4, "La licencia debe tener más de 4 caracteres"],
        maxlength: [100, "La licencia debe tener menos de 100 caracteres"]
    },
    version: {
        type: String,
        trim: true,
        required: [true, "La versión es requerida"],
        minlength: [4, "La versión debe tener más de 4 caracteres"],
        maxlength: [100, "La versión debe tener menos de 100 caracteres"]
    },
    image: {
        public_id: {
            type: String,
            required: [true, "La imagen es requerida"]
        },
        secure_url: {
            type: String,
            required: [true, "La imagen es requerida"]
        }
    },
    barcode: {
        type: String,
        trim: true,
        required: [true, "El código de barras es requerido"],
        minlength: [4, "El código de barras debe tener más de 4 caracteres"],
        maxlength: [100, "El código de barras debe tener menos de 100 caracteres"]
    },
    serial: {
        type: String,
        unique: [true, "El serial debe ser único"],
        trim: true,
        required: [true, "El número de serie es requerido"],
        minlength: [4, "El número de serie debe tener más de 4 caracteres"],
        maxlength: [100, "El número de serie debe tener menos de 100 caracteres"]
    },
    workstation_id: {
        type: mongoose.Types.ObjectId,
    },
    availability: {
        type: String,
        required: [true, "La disponibilidad es requerida"],
        default: "Disponible",
        enum: ["Disponible", "No Disponible"]
    },
    consecutive: {
        type: Number,
        unique: [true, "El consecutivo debe ser único"],
        trim: true,
        required: [true, "El consecutivo es requerido"],
        min: [1, "El consecutivo debe ser mayor a 0"],
        max: [100, "El consecutivo debe ser menor a 100"]
    },
    state: {
        type: Boolean,
        default: true
    },
}, { versionKey: false, timestamps: true });

module.exports = model('Os', OsSchema);
