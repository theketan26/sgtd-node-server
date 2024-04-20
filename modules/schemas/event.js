const mongoose = require('mongoose');

const PersonSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        default: ""
    },
    mobile: {
        type: Number,
        default: 0,
    },
    alt_mobile: {
        type: Number,
        default: 0,
    },
    address: {
        type: String,
        default: ""
    },
});
const PaymentSchema = new mongoose.Schema({
    total: {
        type: Number,
        default: 0
    },
    date: {
        type: String,
        default: ""
    },
    mode: {
        type: String,
        default: "cash"
    },
    paid: {
        type: Number,
        deafult: 0
    }
});
const EventSchema = new mongoose.Schema({
    title: {
        type: String,
        default: ""
    },
    days: {
        type: Number,
        default: 1
    },
    dates: {
        type: [String],
        default: [""]
    },
    host: PersonSchema,
    booker: PersonSchema,
    referer: PersonSchema,
    payment: PaymentSchema,
    note: {
        type: String,
        default: ""
    }
});

const Event = mongoose.model("Event", EventSchema);

module.exports = {
    Event
};