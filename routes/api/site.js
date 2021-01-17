const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const User = require('../../models/User');
const Site = require('../../models/Site');

// @route   POST api/profile
// @desc    Create/update a site
// @access  Private
router.post(
    '/',
    auth,
    [
        check('title', 'Title is required.').not().isEmpty(),
        check('location', 'Location is required.').not().isEmpty(),
        check('bnNumber', 'BN Number is required.').not().isEmpty(),
    ],
    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { title, location, bnNumber, owner, picture } = req.body;

        // Create site object
        const siteFields = {};
        if (title) siteFields.title = title;
        if (location) siteFields.location = location;
        if (bnNumber) siteFields.bnNumber = bnNumber;
        if (owner) siteFields.owner = owner;
        if (picture) siteFields.picture = picture;

        try {
            let site = await Site.findOne({ bnNumber });

            if (site) {
                // Update existing profile
                site = await Site.findOneAndUpdate(
                    { bnNumber },
                    { $set: siteFields },
                    { new: true }
                );

                return res.status(200).json(site);
            }

            site = new Site(siteFields);

            await site.save();

            res.status(200).json(site);
        } catch (err) {
            console.log(err.message);
            res.status(500).send('Server error.');
        }
    }
);

// @route   GET api/site
// @desc    Get all sites
// @access  Public
router.get('/', async (req, res) => {
    try {
        const sites = await Site.find();

        res.status(200).json(sites);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server error.');
    }
});

// @route   GET api/site/user/:uid
// @desc    Get site by owner ID
// @access  Public
router.get('/user/:oid', async (req, res) => {
    try {
        const site = await Site.findOne({
            owner: req.params.oid,
        });

        if (!site) {
            return res.status(404).json({ msg: 'Site not found.' });
        }

        res.status(200).json(site);
    } catch (err) {
        console.log(err.message);
        if (err.kind == 'ObjectId') {
            return res.status(404).json({ msg: 'Site not found.' });
        }
        res.status(500).send('Server error.');
    }
});

// @route   GET api/site/user/:uid
// @desc    Get site by owner ID
// @access  Public
router.get('/user/:oid', async (req, res) => {
    try {
        const site = await Site.findOne({
            owner: req.params.oid,
        });

        if (!site) {
            return res.status(404).json({ msg: 'Site not found.' });
        }

        res.status(200).json(site);
    } catch (err) {
        console.log(err.message);
        if (err.kind == 'ObjectId') {
            return res.status(404).json({ msg: 'Site not found.' });
        }
        res.status(500).send('Server error.');
    }
});

// @route   DELETE api/site/:bn
// @desc    Delete site
// @access  Private
router.delete('/:bn', auth, async (req, res) => {
    try {
        // Remove Site
        await Site.findOneAndRemove({ bnNumber: parseInt(req.params.bn) });

        res.status(200).json({ msg: 'Site deleted.' });
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server error.');
    }
});

// @route   GET /api/site/:sid/employee
// @desc    GET Site employees by Site ID
// @access  Private
router.get('/:sid/employee', auth, async (req, res) => {
    try {
        const site = await Site.findOne({
            _id: req.params.sid,
        });

        if (!site) {
            return res.status(404).json({ msg: 'Site not found.' });
        }

        res.status(200).json(site.employees);
    } catch (err) {
        console.log(err.message);
        if (err.kind == 'ObjectId') {
            return res.status(404).json({ msg: 'Site not found.' });
        }
        res.status(500).send('Server error.');
    }
});

// @route   PUT api/site/:sid/employee
// @desc    Add site employee
// @access  Private
router.put(
    '/:sid/employee',
    [
        auth,
        [
            check('fullName', 'שם מלא הינו שדה חובה.').not().isEmpty(),
            check('badgeNumber', 'מספר עובד הינו שדה חובה.').not().isEmpty(),
            check('role', 'תפקיד הינו שדה חובה.').not().isEmpty(),
            check('department', 'מחלקה הינו שדה חובה.').not().isEmpty(),
        ],
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { fullName, badgeNumber, role, department, startDate } = req.body;

        const newEmployee = {
            fullName,
            badgeNumber,
            role,
            department,
            startDate,
        };

        try {
            const site = await Site.findOne({
                _id: req.params.sid,
            });

            site.employees.unshift(newEmployee);
            await site.save();
            res.status(200).json(site);
        } catch (err) {
            console.log(err.message);
            res.status(500).send('Server error.');
        }
    }
);

// @route   DELETE api/site/:bn/employee/:eid
// @desc    Delete site employee
// @access  Private
router.delete('/:bn/employee/:ban', auth, async (req, res) => {
    try {
        const site = await Site.findOne({ bnNumber: parseInt(req.params.bn) });
        const removeIndex = site.employees
            .map((item) => item.badgeNumber)
            .indexOf(req.params.ban);

        if (removeIndex === -1) {
            return res.status(400).send('Employee not found.');
        }

        site.employees.splice(removeIndex, 1);
        await site.save();
        res.status(200).json(site);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server error.');
    }
});

// @route   GET /api/site/:sid/employee/:eid
// @desc    GET Site employee by Site ID & Employee ID
// @access  Private
router.get('/:sid/employee/:eid', auth, async (req, res) => {
    try {
        var employee = null;

        const site = await Site.findOne({
            _id: req.params.sid,
        });

        if (!site) {
            return res.status(404).json({ msg: 'Site not found.' });
        }

        site.employees.forEach((emp) => {
            if (emp._id.toString() === req.params.eid) {
                employee = emp;
            }
        });

        res.status(200).json(employee);
    } catch (err) {
        console.log(err.message);
        if (err.kind == 'ObjectId') {
            return res.status(404).json({ msg: 'Site not found.' });
        }
        res.status(500).send('Server error.');
    }
});

// @route   GET /api/site/:sid/employee
// @desc    GET Site employees by Site ID
// @access  Private
router.get('/:sid/department', auth, async (req, res) => {
    try {
        const site = await Site.findOne({
            _id: req.params.sid,
        });

        if (!site) {
            return res.status(404).json({ msg: 'Site not found.' });
        }

        res.status(200).json(site.departments);
    } catch (err) {
        console.log(err.message);
        if (err.kind == 'ObjectId') {
            return res.status(404).json({ msg: 'Site not found.' });
        }
        res.status(500).send('Server error.');
    }
});

// @route   PUT api/site/:bn/department
// @desc    Add site department
// @access  Private
router.put(
    '/:sid/department',
    [
        auth,
        [
            check('title', 'שם מחלקה הינו שדה חובה.').not().isEmpty(),
            check('category', 'קטגוריה הינה שדה חובה.').not().isEmpty(),
        ],
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { title, category, owner } = req.body;

        const newDepartment = {
            title,
            category,
            owner,
        };

        try {
            const site = await Site.findOne({
                _id: req.params.sid,
            });

            if (!site) {
                return res.status(404).json({ msg: 'Site not found.' });
            }

            site.departments.unshift(newDepartment);
            await site.save();
            res.status(200).json(site);
        } catch (err) {
            console.log(err.message);
            res.status(500).send('Server error.');
        }
    }
);

// @route   DELETE api/site/:sid/department/:eid
// @desc    Delete site department
// @access  Private
router.delete('/:sid/department/:did', auth, async (req, res) => {
    try {
        const site = await Site.findOne({ _id: req.params.sid });
        const removeIndex = site.departments
            .map((item) => item.id)
            .indexOf(req.params.did);

        if (removeIndex === -1) {
            return res.status(400).send('Department not found.');
        }

        site.departments.splice(removeIndex, 1);
        await site.save();
        res.status(200).json(site);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server error.');
    }
});

// @route   PUT api/site/:bn/employee/:eid/training
// @desc    Add Employee Training
// @access  Private
router.put(
    '/:bn/employee/:eid/training',
    [
        auth,
        [
            check('title', 'כותרת הינה שדה חובה.').not().isEmpty(),
            check('company', 'חברה הינה שדה חובה.').not().isEmpty(),
            check('field', 'תחום הינו שדה חובה.').not().isEmpty(),
            check('date', 'תאריך ביצוע הינו שדה חובה.').not().isEmpty(),
            check('description', 'תיאור הינו שדה חובה.').not().isEmpty(),
            check('proof', 'תיעוד הינו שדה חובה.').not().isEmpty(),
        ],
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {
            title,
            company,
            field,
            date,
            description,
            oneTime,
            reoccurrence,
            proof,
        } = req.body;

        // Calculate next date according to reoccurrence time
        if (!oneTime) {
            var currentDate = new Date(date);
            var nextDate = new Date(
                currentDate.setMonth(currentDate.getMonth() + reoccurrence)
            );
        }

        const newTraining = {
            title,
            company,
            field,
            date,
            description,
            oneTime,
            reoccurrence,
            nextDate,
            proof,
        };

        try {
            const site = await Site.findOne({
                bnNumber: parseInt(req.params.bn),
            });

            site.employees.forEach((employee) => {
                if (employee.id.toString() === req.params.eid) {
                    employee.training.unshift(newTraining);
                }
            });

            await site.save();
            res.status(200).json(site);
        } catch (err) {
            console.log(err.message);
            res.status(500).send('Server error.');
        }
    }
);

// @route   DELETE api/site/:bn/employee/:eid/:tid
// @desc    Delete Employee Training
// @access  Private
router.delete('/:bn/employee/:eid/training/:tid', auth, async (req, res) => {
    try {
        const site = await Site.findOne({ _id: req.params.sid });

        site.employees.forEach((employee) => {
            if (employee.id.toString() === req.params.eid) {
                const removeIndex = employee.training
                    .map((item) => item.id)
                    .indexOf(req.params.tid);

                if (removeIndex === -1) {
                    return res.status(400).send('Training not found.');
                }

                employee.training.splice(removeIndex, 1);
            }
        });
        await site.save();
        res.status(200).json(site);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server error.');
    }
});

// @route   PUT api/site/:sid/department/:did/training
// @desc    Add Department Default Training
// @access  Private
router.put(
    '/:sid/department/:did/training',
    [
        auth,
        [
            check('title', 'כותרת הינה שדה חובה.').not().isEmpty(),
            check('field', 'תחום הינו שדה חובה.').not().isEmpty(),
        ],
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { title, field, oneTime, reoccurrence } = req.body;

        const newTraining = {
            title,
            field,
            oneTime,
            reoccurrence,
        };

        try {
            const site = await Site.findOne({
                _id: req.params.sid,
            });

            if (!site) {
                return res.status(400).json({ msg: 'Site not found.' });
            }

            site.departments.forEach((department) => {
                if (department.id.toString() === req.params.did) {
                    department.defaultTraining.unshift(newTraining);
                }
            });

            await site.save();
            res.status(200).json(site);
        } catch (err) {
            console.log(err.message);
            res.status(500).send('Server error.');
        }
    }
);

// @route   DELETE api/site/:sid/department/:did/:tid
// @desc    Delete Department Default Training
// @access  Private
router.delete('/:sid/department/:did/training/:tid', auth, async (req, res) => {
    try {
        const site = await Site.findOne({ _id: req.params.sid });

        if (!site) {
            return res.status(400).json({ msg: 'Site not found.' });
        }

        site.departments.forEach((department) => {
            if (department.id.toString() === req.params.did) {
                const removeIndex = department.defaultTraining
                    .map((item) => item.id)
                    .indexOf(req.params.tid);

                if (removeIndex === -1) {
                    return res.status(400).send('Training not found.');
                }

                department.defaultTraining.splice(removeIndex, 1);
            }
        });
        await site.save();
        res.status(200).json(site);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server error.');
    }
});

// @route   GET /api/site/:sid/department/:did
// @desc    GET Site department by Site ID & Department ID
// @access  Private
router.get('/:sid/department/:did', auth, async (req, res) => {
    try {
        var department = null;

        const site = await Site.findOne({
            _id: req.params.sid,
        });

        if (!site) {
            return res.status(404).json({ msg: 'Site not found.' });
        }

        site.departments.forEach((dpt) => {
            if (dpt._id.toString() === req.params.did) {
                department = dpt;
            }
        });

        res.status(200).json(department);
    } catch (err) {
        console.log(err.message);
        if (err.kind == 'ObjectId') {
            return res.status(404).json({ msg: 'Site not found.' });
        }
        res.status(500).send('Server error.');
    }
});

module.exports = router;
