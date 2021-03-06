const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

// @route   GET api/auth
// @desc    User Data
// @access  Public
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.status(200).json(user);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('שגיאת שרת.');
    }
});

// @route   POST api/auth
// @desc    Auth user & get JWT Token
// @access  Public
router.post(
    '/',
    [
        check('email', 'אנא הכנס דואר אלקטרוני תקין.').isEmail(),
        check('password', 'אנא הכנס סיסמה תקינה.').exists(),
    ],
    async (req, res) => {
        // Check for errors in request
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Extract relevant data
        const { email, password } = req.body;

        try {
            // Check if user exists
            let user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({
                    errors: [{ msg: 'שם משתמש או סיסמה אינם נכונים.' }],
                });
            }

            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res.status(400).json({
                    errors: [{ msg: 'שם משתמש או סיסמה אינם נכונים.' }],
                });
            }

            // Create JWT Token
            const payload = {
                user: {
                    id: user.id,
                },
            };

            jwt.sign(
                payload,
                config.get('JWTSecret'),
                { expiresIn: 360000 },
                (err, token) => {
                    if (err) throw err;
                    res.status(200).json({ token });
                }
            );
        } catch (err) {
            console.log(err.message);
            res.status(500).send('שגיאת שרת.');
        }
    }
);

module.exports = router;
