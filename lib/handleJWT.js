const jwt = require('jsonwebtoken');

// Funcion para Generar Token con JWT
const generateTokenJWT = (user) => {
    const payload = {
        id: user._id,
        name: user.name,
        email: user.email,
        image: user.image,
        role: user.role,
        state: user.state
    }
    const options = {
        expiresIn: '1h'
    }
    return jwt.sign(payload, process.env.JWT_SECRET, options);
}

// Funcion para Verificar Token con JWT
const VerifyTokenJWT = (token) => {
    const options = {
        expiresIn: '1h'
    }
    return jwt.verify(token, process.env.JWT_SECRET, options, (err, decoded) => {

        try {
            if (err) {
                if (err.name == 'TokenExpiredError') {
                    return {
                        error: 'Token expirado'
                    }
                }
            }
            return {
                valid: true,
                decoded
            }
        } catch (error) {
            return {
                valid: false,
                error: error.message
            }
        }
    })
}

module.exports = {
    generateTokenJWT,
    VerifyTokenJWT
}
