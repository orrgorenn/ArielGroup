const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const User = require('../../models/User');
const Profile = require('../../models/Profile');

// @route   GET api/profile/me
// @desc    Get current users profile
// @access  Private
router.get('/me', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({
            user: req.user.id,
        }).populate('user', ['firstName, lastName', 'profilePicture']);

        if (!profile) {
            return res
                .status(400)
                .json({ msg: 'There is no profile for this user.' });
        }

        res.json(profile);
    } catch (err) {
        onsole.log(err.message);
        res.status(500).send('Server error.');
    }
});

// @route   POST api/profile
// @desc    Create/update a user profile
// @access  Private
router.post(
    '/',
    auth,
    [
        check('status', 'Status is required.').not().isEmpty(),
        check('role', 'Role is required.').not().isEmpty(),
        check('skills', 'Skills is required.').not().isEmpty(),
    ],
    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {
            company,
            website,
            location,
            status,
            role,
            skills,
            bio,
            youtube,
            facebook,
            twitter,
            instagram,
            linkedin,
        } = req.body;

        // Create profile object
        const profileFields = {};
        profileFields.user = req.user.id;
        if (company) profileFields.company = company;
        if (website) profileFields.website = website;
        if (location) profileFields.location = location;
        if (bio) profileFields.bio = bio;
        if (status) profileFields.status = status;
        if (role) profileFields.role = role;
        if (skills) {
            profileFields.skills = skills
                .split(',')
                .map((skill) => skill.trim());
        }

        // Create a social object
        profileFields.social = {};
        if (youtube) profileFields.social.youtube = youtube;
        if (facebook) profileFields.social.facebook = facebook;
        if (twitter) profileFields.social.twitter = twitter;
        if (instagram) profileFields.social.instagram = instagram;
        if (linkedin) profileFields.social.linkedin = linkedin;

        try {
            let profile = await Profile.findOne({ user: req.user.id });

            if (profile) {
                // Update existing profile
                profile = await Profile.findOneAndUpdate(
                    { user: req.user.id },
                    { $set: profileFields },
                    { new: true }
                );

                return res.status(200).json(profile);
            }

            profile = new Profile(profileFields);

            await profile.save();

            res.status(200).json(profile);
        } catch (err) {
            console.log(err.message);
            res.status(500).send('Server error.');
        }
    }
);

// @route   GET api/profile
// @desc    Get all profiles
// @access  Public
router.get('/', async (req, res) => {
    try {
        const profiles = await Profile.find().populate('user', [
            'firstName',
            'lastName',
            'profilePicture',
        ]);
        res.status(200).json(profiles);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server error.');
    }
});

// @route   GET api/profile/user/:uid
// @desc    Get profile by user ID
// @access  Public
router.get('/user/:uid', async (req, res) => {
    try {
        const profile = await Profile.findOne({
            user: req.params.uid,
        }).populate('user', ['firstName', 'lastName', 'profilePicture']);

        if (!profile) {
            return res.status(404).json({ msg: 'Profile not found.' });
        }

        res.status(200).json(profile);
    } catch (err) {
        console.log(err.message);
        if (err.kind == 'ObjectId') {
            return res.status(404).json({ msg: 'Profile not found.' });
        }
        res.status(500).send('Server error.');
    }
});

// @route   DELETE api/profile
// @desc    Delete profile, user
// @access  Private
router.delete('/', auth, async (req, res) => {
    try {
        // Remove Profile
        await Profile.findOneAndRemove({ user: req.user.id });
        // Remove User
        await User.findOneAndRemove({ _id: req.user.id });

        res.status(200).json({ msg: 'User deleted.' });
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server error.');
    }
});

// @route   PUT api/profile/training
// @desc    Add profile training
// @access  Private
router.put(
    '/training',
    [
        auth,
        [
            check('title', 'Title is required.').not().isEmpty(),
            check('company', 'Company is required.').not().isEmpty(),
            check('field', 'Field is required.').not().isEmpty(),
            check('date', 'Date is required.').not().isEmpty(),
            check('reoccurrence', 'Reoccurrence is required.').not().isEmpty(),
            check('proof', 'Proof is required.').not().isEmpty(),
        ],
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { title, company, field, date, reoccurrence, proof } = req.body;

        // Calculate next date according to reoccurrence time
        var currentDate = new Date(date);
        var nextDate = new Date(
            currentDate.setMonth(currentDate.getMonth() + reoccurrence)
        );

        const newTraining = {
            title,
            company,
            field,
            date,
            reoccurrence,
            nextDate,
            proof,
        };

        try {
            const profile = await Profile.findOne({ user: req.user.id });
            profile.training.unshift(newTraining);
            await profile.save();
            res.status(200).json(profile);
        } catch (err) {
            console.log(err.message);
            res.status(500).send('Server error.');
        }
    }
);

// @route   DELETE api/profile/training/:tid
// @desc    Delete profile training
// @access  Private
router.delete('/training/:tid', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id });
        const removeIndex = profile.training
            .map((item) => item.id)
            .indexOf(req.params.tid);

        if (removeIndex === -1) {
            res.status(400).send('Training not found.');
        }

        profile.training.splice(removeIndex, 1);
        await profile.save();
        res.status(200).json(profile);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server error.');
    }
});

module.exports = router;
