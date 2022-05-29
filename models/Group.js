const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const GroupSchema = new Schema({

    name: {
        type: String,
        unique: [true, "El nombre debe ser único"],
        trim: true,
        required: [true, "El nombre es requerido"],
        minlength: [4, "El nombre debe tener más de 4 caracteres"],
        maxlength: [100, "El nombre debe tener menos de 100 caracteres"]
    },
    state: {
        type: Boolean,
        default: true
    },

}, { versionKey: false, timestamps: true });

module.exports = model('Group', GroupSchema);
