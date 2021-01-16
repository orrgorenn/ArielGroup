const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const User = require('../../models/User');

// @route   POST api/users
// @desc    Register User
// @access  Public
router.post(
    '/',
    [
        check('firstName', 'שם פרטי הינו הכרחי.').not().isEmpty(),
        check('lastName', 'שם משפחה הינו הכרחי.').not().isEmpty(),
        check('email', 'אנא הכנס כתובת דואר אלקטרוני תקינה.').isEmail(),
        check('password', 'אנא הכנס סיסמה בעלת 6 תווים או יותר.').isLength({
            min: 6,
        }),
        check('authLevel', 'רמת הרשאה הינה שדה חובה').not().isEmpty(),
    ],
    async (req, res) => {
        // Check for errors in request
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Extract relevant data
        const {
            firstName,
            lastName,
            email,
            password,
            authLevel,
            site,
        } = req.body;

        try {
            // Check if user exists
            let user = await User.findOne({ email });
            if (user) {
                return res.status(400).json({
                    errors: [{ msg: 'User already exists.' }],
                });
            }

            // Create new user instance
            user = new User({
                firstName,
                lastName,
                email,
                password,
                authLevel,
                site,
            });

            // Encrypt password
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);

            // Save user to DB
            await user.save();

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
            res.status(500).send('Server error.');
        }
    }
);

module.exports = router;
