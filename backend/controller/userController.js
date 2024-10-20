const USER = require("../model/userModel");

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

const userLogin = async(req, res) => {
    const { aadharNo, password } = req.body;
    try {
        const { valid, token } = await USER.verifyPassword(aadharNo, password);
        if (!valid) {
            return res.status(401).json({ message: "Invalid aadhar number or password." });
        }
        return res.cookie("token", token, { httpOnly: true, secure: true }).status(200).json({ message: "Login successful!" });
    } catch (err) {
        console.error("Error during user login:", err);
        return res.status(500).json({ message: "Server error. Please try again later." });
    }
}

const userLogout = (req, res) => {
    return res.clearCookie("token").status(200).json({ message: "Logout successful!" });
}

module.exports = { userRegistration, userLogin, userLogout };