const Booking = require('../models/Booking');
const User = require('../models/User');
const { sendInAppNotification, scheduleReminder } = require('../notifications/notificationService');

exports.bookAppointment = async (req, res) => {
    const { doctorId, date, slot } = req.body;
    const patientId = req.user.id;

    // Check for double booking
    const existing = await Booking.findOne({
        doctor: doctorId, date, slot, status: 'confirmed'
    });
    if (existing) return res.status(400).json({ msg: 'Slot already booked' });

    const patientDouble = await Booking.findOne({
        patient: patientId, date, slot, status: 'confirmed'
    });
    if (patientDouble) return res.status(400).json({ msg: 'You have another booking at this time' });

    const booking = new Booking({
        doctor: doctorId, patient: patientId, date, slot
    });
    await booking.save();

    // In-app notification
    await sendInAppNotification(patientId, `Appointment booked with doctor for ${date} at ${slot}`);
    // Schedule reminder
    await scheduleReminder(booking._id);

    res.json({ msg: 'Booking successful', booking });
};

exports.getBookingsForUser = async (req, res) => {
    const userId = req.user.id;
    const role = req.user.role;
    let query = {};
    if (role === 'doctor') query.doctor = userId;
    else query.patient = userId;
    const bookings = await Booking.find(query).populate('doctor patient');
    res.json(bookings);
};