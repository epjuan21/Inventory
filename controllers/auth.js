const User = require('../models/User');
const response = require('../network/response');
const generateToken = require('../lib/generateToken');

async function register(req, res) {

    try {

        const { name, email, password, image, state } = req.body;

        // Verificar si el usuario existe
        const isEmailExists = await User.findOne({ email: email });
        if (isEmailExists) return response.error(req, res, `El Email ${email} ya ha sido registrado`, 409);

        const user = new User({ name, email, password, image, state });

        const userSaved = await user.save();

        let data = {
            _id: userSaved._id,
            name: userSaved.name,
            email: userSaved.email,
            image: userSaved.image,
            state: userSaved.state,
            token: generateToken(userSaved._id)
        }

        response.success(req, res, data, 201);

    } catch (error) {
        response.error(req, res, error.message, 500);
    }
}

async function login(req, res) {

    try {
        const { email, password } = req.body;

        // Verificar si el usuario existe
        const user = await User.findOne({ email: email });
        if (!user) return response.error(req, res, `El Email ${email} no ha sido registrado`, 404);

        // Validar si el usuario esta activo
        if (!user.state) return response.error(req, res, `El usuario ${email} esta inactivo`, 401);

        // Validar password
        const isPasswordCorrect = await User.comparePassword(password, user.password);
        if (!isPasswordCorrect) return response.error(req, res, `El Password es incorrecto`, 401);

        // Generar token
        const token = generateToken(user._id);

        let data = {
            _id: user._id,
            name: user.name,
            image: user.image,
            email: user.email,
            token: token
        }

        response.success(req, res, data, 200);

    } catch (error) {
        response.error(req, res, error.message, 500);
    }
}

module.exports = {
    register,
    login
}
