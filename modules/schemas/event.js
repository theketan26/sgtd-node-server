const mongoose = require('mongoose');

const PersonSchema = new mongoose.Schema({
    name: String,
    email: String,
    mobile: Number,
    alt_mobile: Number,
    address: String,
});
const PaymentSchema = new mongoose.Schema({
    total: Number,
    date: String,
    mode: String,
    paid: Number
});
const EventSchema = new mongoose.Schema({
    title: String,
    days: Number,
    dates: [String],
    times: [String],
    booker: PersonSchema,
    referer: PersonSchema,
    payment: PaymentSchema,
    note: String
});

const Event = mongoose.model("Event", EventSchema);

module.exports = {
    Event
};