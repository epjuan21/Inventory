const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const TypeSchema = new Schema({

    name: {
        type: String,
        required: [true, "El nombre es requerido"],
        unique: [true, "El nombre debe ser único"],
        trim: true,
        minlength: [4, "El nombre debe tener más de 4 caracteres"],
        maxlength: [100, "El nombre debe tener menos de 100 caracteres"]
    },
    state: {
        type: Boolean,
        default: true
    },
}, { versionKey: false, timestamps: true });

module.exports = model('Type', TypeSchema);
