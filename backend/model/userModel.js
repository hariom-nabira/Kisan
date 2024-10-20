const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");
const { createToken } = require("../utils/auth");

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    middleName: {
        type: String,
        trim: true
    },
    lastName: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    },
    phoneNo: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        match: /^\d{10}$/
    },
    aadharNo: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        match: /^\d{12}$/
    },
    password: {
        type: String,
        required: true,
    },
    salt: {
        type: String,
    }
}, { timestamps: true });

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(this.password, salt);
        this.salt = salt;
        this.password = hash;
        next()
    } catch(err) {
        console.log("Error in user model\n");
        console.log(err);
        next(err);
    }
});

userSchema.statics.verifyPassword = async function(aadharNo, password) {
    const user = await this.findOne({aadharNo: aadharNo});
    if(!user) {
        return { valid: false };
    }
    const valid = await bcrypt.compare(password, user.password);
    if(valid) {
        const token = createToken(user);
        return { valid: true, token };
    }
    return { valid: false };
}

const USER = model("users", userSchema);

module.exports = USER;
