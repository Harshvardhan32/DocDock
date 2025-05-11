const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Mock OTP generator
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

exports.register = async (req, res) => {
    const { mobile, name, role } = req.body;
    if (!mobile || !name || !role) return res.status(400).json({ msg: 'All fields required' });
    let user = await User.findOne({ mobile });
    if (user) return res.status(400).json({ msg: 'User already exists' });
    const otp = generateOTP();
    user = new User({ mobile, name, role, otp });
    await user.save();
    // In real app, send OTP via SMS
    res.json({ msg: 'OTP sent', otp: process.env.NODE_ENV === 'development' ? otp : undefined });
};

exports.verifyOTP = async (req, res) => {
    const { mobile, otp } = req.body;
    const user = await User.findOne({ mobile });
    if (!user || user.otp !== otp) return res.status(400).json({ msg: 'Invalid OTP' });
    user.otp = null;
    await user.save();
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: user._id, name: user.name, role: user.role } });
};

exports.login = async (req, res) => {
    const { mobile } = req.body;
    const user = await User.findOne({ mobile });
    if (!user) return res.status(400).json({ msg: 'User not found' });
    const otp = generateOTP();
    user.otp = otp;
    await user.save();
    // In real app, send OTP via SMS
    res.json({ msg: 'OTP sent', otp: process.env.NODE_ENV === 'development' ? otp : undefined });
};

const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');
const Admin = require('../../models/Admin');
const Parent = require('../../models/Parent');
const Teacher = require('../../models/Teacher');
const Student = require('../../models/Student');
const mailSender = require('../../utils/mailSender');
const { resetPasswordEmail } = require('../../mail/templates/resetPasswordEmail');
require('dotenv').config();

exports.login = async (req, res) => {
    try {
        const { email, otp } = req.body;

        if (!email || !otp) {
            return res.status(400).json({
                success: false,
                message: 'Please fill all required details!'
            })
        }

        // Find user with email
        const user = await User.findOne({ email });

        // If user not found with provided userId
        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'Email is incorrect.',
            });
        }

        // Generate JWT token and Compare Password
        if (await bcrypt.compare(password, user?.userId.password)) {
            const token = jwt.sign(
                {
                    email: user?.userId?.email,
                    id: user?.userId?._id,
                    role: user?.userId?.role,
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: '24h'
                }
            )

            // Save token to user document in database
            const updatedUser = await User.findByIdAndUpdate(user?.userId._id,
                { token }, { new: true });

            updatedUser.password = undefined;
            user.token = token;
            user.userId = updatedUser;

            // Set cookie for token and return success response
            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true,
            };

            return res.cookie("token", token, options).status(200).json({
                success: true,
                token,
                data: user,
                message: 'User login successfully!'
            })
        } else {
            return res.status(401).json({
                success: false,
                message: 'Password is incorrect',
            });
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            errorMessage: error.message,
            message: "Internal Server Error!"
        })
    }
}