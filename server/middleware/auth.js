const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.isAuth = async (req, res, next) => {
    try {
        const token =
            req.cookies.token ||
            req.body.token ||
            req.header("Authorization").replace("Bearer ", "");

        if (!token) {
            return res.status(400).json({
                success: false,
                message: 'Token Missing'
            });
        }

        try {
            // Verifying the JWT using the secret key stored in environment variables
            const decode = await jwt.verify(token, process.env.JWT_SECRET);
            req.user = decode;
        } catch (error) {
            // If JWT verification fails, return 401 Unauthorized response
            return res.status(401).json({
                success: false,
                message: "Token is invalid"
            });
        }

        // If JWT is valid, move on to the next middleware or request handler
        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            errorMessage: error.message,
            message: 'Internal Server Error!'
        })
    }
}

exports.isDoctor = async (req, res, next) => {
    try {
        const { role } = req.user;

        if (role !== 'Doctor') {
            return res.status(401).json({
                success: false,
                message: "This is a Protected Route for Doctor",
            });
        }

        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            errorMessage: error.message,
            message: 'Internal Server Error!'
        });
    }
}

exports.isPatient = async (req, res, next) => {
    try {

        const { role } = req.user;

        if (role !== 'Patient') {
            return res.status(401).json({
                success: false,
                message: "This is a Protected Route for Patient",
            });
        }

        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            errorMessage: error.message,
            message: 'Internal Server Error!'
        });
    }
}