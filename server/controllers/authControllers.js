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