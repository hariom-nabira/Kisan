const JWT = require("jsonwebtoken");

const secretKey = process.env.JWT_SECRET_KEY;
const refreshSecretKey = process.env.JWT_REFRESH_SECRET_KEY;

const createAccessToken = (user) => {
    const payload = {
        _id: user._id,
        name: user.firstName,
        email: user.email
    }
    return JWT.sign(payload, secretKey, { expiresIn: "15m" });
}

const createRefreshToken = (user) => {
    const payload = {
        _id: user._id,
        name: user.firstName,
        email: user.email
    }
    return JWT.sign(payload, refreshSecretKey, { expiresIn: "5h" });
}

const validateAccessToken = (token) => {
    try {
        return JWT.verify(token, secretKey);
    } catch (error) {
        return null;
    }
}
const validateRefreshToken = (token) => {
    try {
        return JWT.verify(token, refreshSecretKey);
    } catch (error) {
        return null;
    }
}

module.exports = { createAccessToken, createRefreshToken, validateAccessToken, validateRefreshToken };