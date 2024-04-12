import mongoose from 'mongoose';

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
    }
}, { timestamps: true }
);

export default mongoose.model('Payment', paymentSchema)