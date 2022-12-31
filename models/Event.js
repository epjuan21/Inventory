const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const EventSchema = new Schema({

    event: {
        type: String,
        trim: true,
        minlength: [20, "El nombre debe tener más de 20 caracteres"],
        maxlength: [1000, "El nombre debe tener menos de 1000 caracteres"]
    },
    eventDate: {
        type: Date,
        default: Date.now()
    }

}, { versionKey: false, timestamps: true })

module.exports = model ('Event', EventSchema)
