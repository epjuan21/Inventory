const { handleHttpError } = require("../lib/handleHttpResponse");
const { VerifyTokenJWT } = require("../lib/handleJWT");
const User = require("../models/User");

// Middleware para Validar Token con JWT
const validateTokenJWT = async (req, res, next) => {
    // Obtener Bearer Token del Header
    const bearerHeader = req.headers["authorization"];
    // Comprobar que el token existe
    if (typeof bearerHeader !== "undefined") {
        // Divide el token en dos partes, el Bearer y el token
        const token = bearerHeader.split(" ")[1];
        try {
            // Verificar Token
            const { decoded, valid, error } = VerifyTokenJWT(token);
            // Verificar si el Token es Valido
            if (valid) {
                // Obtener el Usuario por el ID
                const user = await User.findById({ _id: decoded.id }).select("-password -confirmed -tokenUser -createdAt -updatedAt");
                // Verificar si el Usuario existe
                if (user) {
                    // Verificar si el usuario esta activo
                    if (!user.state) {
                        return handleHttpError(res, "Usuario inactivo", 404);
                    }
                    // Asignar el Usuario al Request
                    req.user = user;
                    // Pasar al siguiente Middleware
                    next();
                } else {
                    // Si el Usuario no existe, retornar un error
                    return handleHttpError(res, "El Usuario no existe", 404);
                }
            } else {
                // Si el Token es Invalido, retornar un error
                return handleHttpError(res, error, 401);
            }
        } catch (error) {
            // Si ocurre un error, retornar un error
            return handleHttpError(res, "El Token es Invalido", 401);
        }
    } else {
        // Si el Token no existe, retornar un error
        return handleHttpError(res, "El Token no existe", 401);
    }
}

module.exports = {
    validateTokenJWT
}
