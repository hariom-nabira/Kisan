const JWT = require("jsonwebtoken");

const secretKey = process.env.JWT_SECRET_KEY;

const createToken = (user) => {
    const payload = {
        _id: user._id,
        name: user.firstName,
        email: user.email
    }
    return JWT.sign(payload, secretKey, { expiresIn: "1h" });
}

const validateToken = (token) => {
    try {
        return JWT.verify(token, secretKey);
    } catch (error) {
        return null;
    }
}

module.exports = { createToken, validateToken };