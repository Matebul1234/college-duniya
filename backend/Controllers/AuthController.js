const bcrypt = require('bcrypt');
const userModel = require("../models/User");
const jwt = require('jsonwebtoken');

const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if the user already exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: "User already exists, you can login", success: false });
        }

        // Create a new user
        const newUser = new userModel({ name, email, password });
        newUser.password = await bcrypt.hash(password, 10);
        await newUser.save();

        res.status(200).json({ message: 'Signup successfully', success: true });
    } catch (error) {
        console.error("Error in signup:", error);
        res.status(500).json({ message: "Internal Server Error", success: false });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const errorMessage = "Auth failed email or password is wrong";
        // Check if the user already exists
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(403).json({ message: errorMessage, success: false });
        }

        // Create a new user
        const isPassword = await bcrypt.compare(password, user.password);
        if (!isPassword) {
            return res.status(403).json({ message: errorMessage, success: false });
        }
        const jwtToken = jwt.sign(
            { email: user.email, _id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        )

        res.status(200).json({
            message: 'login success',
            success: true,
            jwtToken,
            email,
            name: user.name
        });
    } catch (error) {
        console.error("Error in signup:", error);
        res.status(500).json({ message: "Internal Server Error", success: false });
    }
};

module.exports = {
    signup,
    login
};
