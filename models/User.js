const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt');

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "El nombre es requerido"],
    unique: [true, "El nombre debe ser único"],
    minlength: [10, "El nombre debe tener más de 10 caracteres"],
    maxlength: [100,"El nombre debe tener menos de 100 caracteres"]
  },
  email: {
    type: String,
    required: [true,"El Email es requerido" ],
    minlength: [6, "El email debe tener más de 6 caracteres"],
    maxlength: [100,"El email debe tener menos de 100 caracteres"]
  },
  password: {
    type: String,
    required:  [true, "El Password es requerido"],
    minlength: [6, "El Password debe tener mas de 6 caracteres"],
  }
},
{
  versionKey: false,
  timestamps: true
});

// Encriptar password antes de guardar
userSchema.pre('save', async function (next) {

  if(!this.isModified('password')) {
      next();
  }
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

// Comparar password del request con el de la base de datos
userSchema.statics.comparePassword = async(password, recievedPassword) => {

  return await bcrypt.compare(password, recievedPassword)
}

module.exports = mongoose.model('User', userSchema);
