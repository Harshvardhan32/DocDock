const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { updateProfile, getDoctors, getDoctorById } = require('../controllers/doctorController');

router.put('/profile', auth('doctor'), updateProfile);
router.get('/', getDoctors);
router.get('/:id', getDoctorById);

module.exports = router;