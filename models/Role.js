const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const RoleSchema = new Schema({
    role: {
        type: String,
        required: [true, "El rol es requerido"],
        unique: [true, "El rol debe ser único"],
        default: 'USER_ROLE',
        enum: ['USER_ROLE', 'ADMIN_ROLE']
    }
}
    , { versionKey: false, timestamps: true }
);

module.exports = model('Role', RoleSchema);
