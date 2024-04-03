const mongoose = require('mongoose');

const membershipPaymentSchema = new mongoose.Schema({
    nameOnCard: {
        type: String,
        required: true
    },
    cardNumber: {
        type: Number,
        required: true
    },
    expDate: {
        type: String,
        required: true
    },
    cvv: {
        type: String,
        required: true
    },
    
});

module.exports = mongoose.model('MembershipPayment', membershipPaymentSchema);
