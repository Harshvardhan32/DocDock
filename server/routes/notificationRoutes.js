const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { getNotifications } = require('../notifications/notificationService');

router.get('/', auth(), getNotifications);

module.exports = router;