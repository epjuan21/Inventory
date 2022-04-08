const User = require('../models/User');
const response = require('../network/response');

async function register (req, res) {

  try {

    const { name, email, password } = req.body;

    const isEmailExists = await User.findOne({email: email});

    // Validar Email Unico
    if(isEmailExists) return response.error(req, res, `El Email ${email} ya ha sido registrado`, 409);

    const user = new User({name, email, password})

    const userSaved = await user.save();

    let message = {
        _id: userSaved._id,
        name: userSaved.name,
        email: userSaved.email,
      }

    response.success(req, res, message, 201);

  } catch (error) {
    response.error(req, res, error.message, 500);
  }
}

async function login(req, res) {

  try {
    const { email, password } = req.body;

    const user = await User.findOne({email: email});

    if(!user) return res.error(req, res, `El Email ${email} no ha sido registrado`, 404);

    const isPasswordCorrect = await user.comparePassword(password);

    if(!isPasswordCorrect) return res.error(req, res, `El Password es incorrecto`, 401);

    let message = {
      _id: user._id,
      name: user.name,
      email: user.email,
      token: user.generateToken(user._id)
    }

    res.success(req, res, message, 200);

  } catch (error) {
    res.error(req, res, error.message, 500);
  }
}

module.exports = {
  register,
  login
}
