const User = require('../models/User');
const { generateTokenJWT } = require('../lib/handleJWT');
const { handleHttpError, handleHttpSuccess } = require('../lib/handleHttpResponse');
const { generarId } = require('../lib/genId');

async function register(req, res) {

    try {
        const { name, email, password, image, state } = req.body;
        const user = new User({ name, email, password, image, state });
        user.tokenUser = generarId()
        const userSaved = await user.save();
        let data = {
            _id: userSaved._id,
            name: userSaved.name,
            email: userSaved.email,
            image: userSaved.image,
            state: userSaved.state,
            tokenUser: userSaved.tokenUser,
            confirmed: userSaved.confirmed,
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

async function confirm(req, res) {

    const { token } = req.params;
    const usuarioConfirmar = await User.findOne({ tokenUser: token })

    if (!usuarioConfirmar) {
        handleHttpError(res, "Token no válido", 500);
    }

    try {
        usuarioConfirmar.confirmed = true
        usuarioConfirmar.tokenUser = ''
        await usuarioConfirmar.save()
        handleHttpSuccess(res, "Usuario Confirmado", 200);
    } catch (error) {
        handleHttpError(res, error.message, 500);
    }
}

async function resetPassword(req, res) {

    const { email } = req.body
    const user = await User.findOne({ email: email }, { password: 0 });
    if (!user) {
        const error = new Error("El usuario no existe")
        handleHttpError(res, error.message, 500);
    }

    try {
        user.tokenUser = generarId()
        await user.save()
        handleHttpSuccess(res, "Se ha enviado un Email con las instrucciones para resetear el password", 200);
    } catch (error) {
        handleHttpError(res, error.message, 500);
    }
}

async function verifyToken(req, res) {

    const { token } = req.params;

    const validToken = await User.findOne({ tokenUser: token})
    if(validToken){
        handleHttpSuccess(res, "Token válido", 200);
    } else {
        const error = new Error("El Token no es válido")
        handleHttpError(res, error.message, 500);
    }
}

async function renewPassword(req, res) {

    const { token } = req.params;
    const { password } = req.body;

    const usuario = await User.findOne({ tokenUser: token})
    if(usuario){
        usuario.password = password
        usuario.tokenUser = ''
        try {
            await usuario.save()
            handleHttpSuccess(res, "Password modificado correctamente", 200);
        } catch (error) {
            handleHttpError(res, error.message, 500);
        }
    } else {
        const error = new Error("El Token no es válido")
        handleHttpError(res, error.message, 500);
    }
}

async function getProfile(req, res) {
    const { user } = req
    handleHttpSuccess(res, user, 200);
}

module.exports = {
    register,
    login,
    confirm,
    resetPassword,
    verifyToken,
    renewPassword,
    getProfile
}
