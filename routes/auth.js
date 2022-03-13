//====== User Authorization Routes ======
const express = require('express');
const { register,
    login,
    logout,
    forgotPassword,
    updatePassword } = require('../controllers/auth');

const router = express.Router();

//====== User Authorization Routes ======
router.post('/register', register);
router.get('/register', register);
router.post('/login', login);
router.get('/logout/:uid', logout);
router.post('/forgot-password', forgotPassword);
router.put('/update-password/:tempPassword', updatePassword);

//====== Export Router ======
module.exports = router;