const User = require('../models/User');

exports.updateProfile = async (req, res) => {
    const { specialties, availability, clinic } = req.body;
    const user = await User.findById(req.user.id);
    if (!user || user.role !== 'doctor') return res.status(404).json({ msg: 'Doctor not found' });
    if (specialties) user.specialties = specialties;
    if (availability) user.availability = availability;
    if (clinic) user.clinic = clinic;
    await user.save();
    res.json(user);
};

exports.getDoctors = async (req, res) => {
    const { specialty, lng, lat } = req.query;
    let query = { role: 'doctor' };
    if (specialty) query.specialties = specialty;
    let doctors = await User.find(query);
    if (lng && lat) {
        // Calculate distance using MongoDB geonear
        doctors = await User.aggregate([
            {
                $geoNear: {
                    near: { type: "Point", coordinates: [parseFloat(lng), parseFloat(lat)] },
                    distanceField: "dist.calculated",
                    spherical: true,
                    query: { role: 'doctor', specialties: specialty }
                }
            },
            { $sort: { "dist.calculated": 1 } }
        ]);
    }
    res.json(doctors);
};

exports.getDoctorById = async (req, res) => {
    const doctor = await User.findById(req.params.id);
    if (!doctor || doctor.role !== 'doctor') return res.status(404).json({ msg: 'Doctor not found' });
    res.json(doctor);
};