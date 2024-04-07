const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    number: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    is_card_payment: {
        type: Boolean,
        required: true,
        default: false
    },


});

module.exports = mongoose.model('Payment', paymentSchema);
