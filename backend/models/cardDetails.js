import mongoose from 'mongoose';

const cardPaymentSchema  = new mongoose.Schema({
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
    payment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Payment',
        required: true
    },
}, { timestamps: true }
);

export default mongoose.model('CardPayment', cardPaymentSchema )