const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, "El nombre es requerido"],
        trim: true,
        unique: [true, "El nombre debe ser único"],
        minlength: [4, "El nombre debe tener más de 5 caracteres"],
        maxlength: [100, "El nombre debe tener menos de 100 caracteres"]
    },
    email: {
        type: String,
        unique: [true, "El correo debe ser único"],
        trim: true,
        required: [true, "El Email es requerido"],
        minlength: [7, "El email debe tener más de 6 caracteres"],
        maxlength: [100, "El email debe tener menos de 100 caracteres"]
    },
    password: {
        type: String,
        trim: true,
        required: [true, "El Password es requerido"],
        minlength: [7, "El Password debe tener mas de 6 caracteres"],
    },
    image: {
        type: String,
        default: "https://res.cloudinary.com/jfrvdata/image/upload/v1652546429/Users/userMale.png"
    },
    role: {
        type: String,
        required: [true, "El rol es requerido"],
        default: 'USER_ROLE',
        enum: ['USER_ROLE', 'ADMIN_ROLE']
    },
    state: {
        type: Boolean,
        default: true
    }
},
    { versionKey: false, timestamps: true });

// Encriptar password antes de guardar
userSchema.pre('save', async function (next) {

    if (!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

// Comparar password del request con el de la base de datos
userSchema.statics.comparePassword = async (password, recievedPassword) => {

    return await bcrypt.compare(password, recievedPassword)
}

module.exports = model('User', userSchema);
