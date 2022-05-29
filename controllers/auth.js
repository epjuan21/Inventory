const User = require('../models/User');
const { generateTokenJWT } = require('../lib/handleJWT');
const { handleHttpError, handleHttpSuccess } = require('../lib/handleHttpResponse');

async function register(req, res) {

    try {
        const { name, email, password, image, state } = req.body;
        const user = new User({ name, email, password, image, state });
        const userSaved = await user.save();
        let data = {
            _id: userSaved._id,
            name: userSaved.name,
            email: userSaved.email,
            image: userSaved.image,
            state: userSaved.state,
            token: generateTokenJWT(userSaved)
        }

        handleHttpSuccess(res, data, 201);

    } catch (error) {
        handleHttpError(res, error.message, 500);
    }
}

async function login(req, res) {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email: email }, { password: 0 });
        // Generar token
        const token = generateTokenJWT(user);
        let data = {
            _id: user._id,
            name: user.name,
            image: user.image,
            email: user.email,
            token: token
        }

        handleHttpSuccess(res, data, 200);

    } catch (error) {
        handleHttpError(res, error.message, 500);
    }
}

module.exports = {
    register,
    login
}
