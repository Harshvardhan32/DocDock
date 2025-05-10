const Booking = require('../models/Booking');
const User = require('../models/User');

// In-app notification (mock)
const notifications = {}; // { userId: [messages] }

exports.sendInAppNotification = async (userId, message) => {
    if (!notifications[userId]) notifications[userId] = [];
    notifications[userId].push({ message, date: new Date() });
};

exports.getNotifications = async (req, res) => {
    const userId = req.user.id;
    res.json(notifications[userId] || []);
};

// Reminder (mock, in real app use cron or queue)
exports.scheduleReminder = async (bookingId) => {
    const booking = await Booking.findById(bookingId).populate('doctor patient');
    if (!booking) return;
    const appointmentTime = new Date(`${booking.date}T${booking.slot}:00`);
    const reminderTime = new Date(appointmentTime.getTime() - 60 * 60 * 1000); // 1 hour before
    const now = new Date();
    const delay = reminderTime - now;
    if (delay > 0) {
        setTimeout(async () => {
            const doctor = await User.findById(booking.doctor);
            const directions = `https://www.google.com/maps/dir/?api=1&destination=${doctor.clinic.location.coordinates[1]},${doctor.clinic.location.coordinates[0]}`;
            await exports.sendInAppNotification(booking.patient, `Reminder: Appointment in 1 hour. Directions: ${directions}`);
            booking.notificationSent = true;
            await booking.save();
        }, delay);
    }
};