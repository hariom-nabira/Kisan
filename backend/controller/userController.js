const USER = require("../model/userModel");
const { createRefreshToken, validateRefreshToken, createAccessToken } = require("../utils/auth");

const userRegistration = async (req, res) => {
    console.log("DATA received: ", req.body);
    const { firstName, middleName, lastName, email, phoneNo, aadharNo, password } = req.body;

    if (!firstName || !email || !phoneNo || !aadharNo || !password) {
        return res.status(400).json({ message: "Please fill in all required fields." });
    }

    const existingEmail = await USER.findOne({ email });
    if (existingEmail) {
        return res.status(400).json({ message: "Email already in use." });
    }

    const existingPhone = await USER.findOne({ phoneNo });
    if (existingPhone) {
        return res.status(400).json({ message: "Phone number already in use." });
    }

    const existingAadhar = await USER.findOne({ aadharNo });
    if (existingAadhar) {
        return res.status(400).json({ message: "Aadhar number already in use." });
    }

    try {
        await USER.create({
            firstName,
            middleName,
            lastName,
            email,
            phoneNo,
            aadharNo,
            password,
        });
        res.status(201).json({ message: "Registration successful!" });
    } catch (err) {
        console.error("Error during user registration:", err);
        res.status(500).json({ message: "Server error. Please try again later." });
    }
}

const userLogin = async (req, res) => {
    const { aadharNo, password } = req.body;
    try {
        const user = await USER.verifyPassword(aadharNo, password);
        if (!user) {
            return res.status(401).json({ message: "Invalid aadhar number or password." });
        }
        const accessToken = createAccessToken(user);
        const refreshToken = createRefreshToken(user);

        return res.status(200).json({
            message: "Login successful!",
            accessToken,
            refreshToken
        });
    } catch (err) {
        console.error("Error during user login:", err);
        return res.status(500).json({ message: "Server error. Please try again later." });
    }
}

const userLogout = () => {
    setTokens({ accessToken: null, refreshToken: null });
    sessionStorage.removeItem('accessToken');
    sessionStorage.removeItem('refreshToken');

    return res.status(200).json({ message: "Logout successful!" });
};

const refreshAccessToken = async (req, res) => {
    const { refreshToken } = req.body;
    if (!refreshToken) {
        return res.status(401).json({ message: "Missing refresh token." });
    }
    try {
        const decoded = validateRefreshToken(refreshToken);
        if (!decoded) {
            return res.status(401).json({ message: "Invalid refresh token." });
        }
        const newAccessToken = createAccessToken(user);
        return res.status(200).json({
            message: "Refresh token successful!",
            accessToken: newAccessToken,
        });
    } catch (err) {
        console.error("Error during refresh token:", err);
        return res.status(500).json({
            message: "Server error. Please try again later."
        });
    }
}

    module.exports = { userRegistration, userLogin, userLogout, refreshAccessToken };