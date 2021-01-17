const mongoose = require('mongoose');

const SiteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    bnNumber: {
        type: Number,
        required: true,
        unique: true,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    picture: {
        type: String,
        required: true,
        default: 'default.png',
    },
    departments: [
        {
            title: {
                type: String,
                required: true,
            },
            category: {
                type: String,
                required: true,
            },
            owner: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'user',
            },
            defaultTraining: [
                {
                    title: {
                        type: String,
                        required: true,
                    },
                    field: {
                        type: String,
                        required: true,
                    },
                    oneTime: {
                        type: Boolean,
                    },
                    reoccurrence: {
                        type: Number,
                    },
                },
            ],
        },
    ],
    employees: [
        {
            fullName: {
                type: String,
                required: true,
            },
            badgeNumber: {
                type: Number,
                required: true,
            },
            role: {
                type: String,
                required: true,
            },
            department: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'department',
                required: true,
            },
            startDate: {
                type: Date,
                required: true,
                default: Date.now,
            },
            training: [
                {
                    title: {
                        type: String,
                        required: true,
                    },
                    company: {
                        type: String,
                        required: true,
                    },
                    field: {
                        type: String,
                        required: true,
                    },
                    date: {
                        type: Date,
                        required: true,
                    },
                    oneTime: {
                        type: Boolean,
                    },
                    reoccurrence: {
                        type: Number,
                    },
                    nextDate: {
                        type: Date,
                    },
                    proof: {
                        type: String,
                        required: true,
                    },
                },
            ],
        },
    ],
    date: {
        type: Date,
        default: Date.now,
    },
});

module.exports = Site = mongoose.model('site', SiteSchema);
