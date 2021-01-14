const express = require('express');
const router = express.Router();

const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const User = require('../../models/User');
const Profile = require('../../models/Profile');
const Ticket = require('../../models/Ticket');

// @route   POST api/tickets
// @desc    Create a ticket
// @access  Private
router.post(
    '/',
    [
        auth,
        [
            check('title', 'Title is required.').not().isEmpty(),
            check('category', 'Category is required.').not().isEmpty(),
            check('location', 'Location is required.').not().isEmpty(),
            check('description', 'Description is required.').not().isEmpty(),
        ],
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const user = await User.findById(req.user.id).select('-password');

            const {
                title,
                category,
                subcategory,
                location,
                description,
                priority,
            } = req.body;

            const ticketFields = {};
            ticketFields.owner = req.user.id;
            if (title) ticketFields.title = title;
            if (category) ticketFields.category = category;
            if (subcategory) ticketFields.subcategory = subcategory;
            if (location) ticketFields.location = location;
            if (description) ticketFields.description = description;
            if (priority) ticketFields.priority = priority;

            const newTicket = new Ticket(ticketFields);

            const ticket = await newTicket.save();
            res.status(200).json(ticket);
        } catch (err) {
            console.log(err.message);
            res.status(500).send('Server error.');
        }
    }
);

// @route   GET api/tickets
// @desc    Get all tickets
// @access  Private
router.get('/', auth, async (req, res) => {
    try {
        const tickets = await Ticket.find().sort({ date: -1 });
        res.status(200).json(tickets);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server error.');
    }
});

// @route   GET api/tickets
// @desc    Get ticket by ID
// @access  Private
router.get('/:tid', auth, async (req, res) => {
    try {
        const ticket = await Ticket.findById(req.params.tid);
        if (!ticket) {
            return res.status(404).json({ msg: 'Ticket not found.' });
        }
        res.status(200).json(ticket);
    } catch (err) {
        console.log(err.message);
        if (err.kind == 'ObjectId') {
            return res.status(404).json({ msg: 'Ticket not found.' });
        }
        res.status(500).send('Server error.');
    }
});

// @route   DELETE api/tickets
// @desc    Delete a ticket
// @access  Private
router.delete('/:tid', auth, async (req, res) => {
    try {
        const ticket = await Ticket.findById(req.params.tid);
        if (!ticket) {
            return res.status(404).json({ msg: 'Ticket not found.' });
        }

        if (ticket.owner.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized.' });
        }

        await ticket.remove();

        res.status(200).json({ msg: 'Ticket removed.' });
    } catch (err) {
        console.log(err.message);
        if (err.kind == 'ObjectId') {
            return res.status(404).json({ msg: 'Ticket not found.' });
        }
        res.status(500).send('Server error.');
    }
});

// @route   POST api/tickets/comment/:tid
// @desc    Comment on a ticket
// @access  Private
router.post(
    '/comment/:tid',
    [auth, [check('content', 'Content is required.').not().isEmpty()]],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const user = await User.findById(req.user.id).select('-password');
            const ticket = await Ticket.findById(req.params.tid);

            const newComment = {
                user: req.user.id,
                name: user.firstName + ' ' + user.lastName,
                content: req.body.content,
            };

            ticket.comments.unshift(newComment);

            await ticket.save();

            res.status(200).json(ticket.comments);
        } catch (err) {
            console.log(err.message);
            res.status(500).send('Server error.');
        }
    }
);

// @route   DELETE api/tickets/comment/:tid/:cid
// @desc    Delete a comment
// @access  Private
router.delete('/comment/:tid/:cid', auth, async (req, res) => {
    try {
        const ticket = await Ticket.findById(req.params.tid);

        const comment = ticket.comments.find(
            (comment) => comment.id === req.params.cid
        );

        if (!comment) {
            return res.status(404).json({ msg: 'Comment not found.' });
        }

        if (comment.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized.' });
        }

        const removeIndex = ticket.comments
            .map((comment) => comment.user.toString())
            .indexOf(req.user.id);

        ticket.comments.splice(removeIndex, 1);

        await ticket.save();

        res.status(200).json(ticket.comments);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server error.');
    }
});

module.exports = router;
