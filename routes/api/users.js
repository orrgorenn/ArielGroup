const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');

const User = require('../../models/User');

// @route   POST api/users
// @desc    Register User
// @access  Public
router.post(
    '/',
    [
        check('firstName', 'First name is required').not().isEmpty(),
        check('lastName', 'Last name is required').not().isEmpty(),
        check('email', 'Please enter a valid email address.').isEmail(),
        check(
            'password',
            'Please enter a password with 6 or more characters.'
        ).isLength({ min: 6 }),
    ],
    async (req, res) => {
        // Check for errors in request
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Extract relevant data
        const { firstName, lastName, email, password } = req.body;

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
            });

            // Encrypt password
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);

            // Save user to DB
            await user.save();

            res.send('User registered.');
        } catch (err) {
            console.log(err.message);
            res.status(500).send('Server error.');
        }
    }
);

module.exports = router;
