import paymentModel from "../models/paymentModel.js";

export const getPayments = async (req, res) => {
    try {
        const payments = await paymentModel.find();
        res.json(payments);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

export const addPayment = async (req, res) => {
    try {
        const newPayment = new paymentModel({
            name: req.body.name,
            number: req.body.number,
            address: req.body.address,
            email: req.body.email,
            is_card_payment: req.body.is_card_payment
        });
        const payment = await newPayment.save();
        res.json(payment);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

export const deletePayment = async (req, res) => {
    try {
        const deletedPayment = await paymentModel.findByIdAndDelete(req.params.id);
        if (!deletedPayment) {
            return res.status(404).json({ msg: 'Payment not found' });
        }
        res.json({ msg: 'Payment removed', deletedPayment });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

export const getPaymentById = async (req, res) => {
    try {
        const payment = await paymentModel.findById(req.params.id);
        if (!payment) {
            return res.status(404).json({ msg: 'Payment not found' });
        }
        res.json(payment);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

export const editPayment = async (req, res) => {
    try {
        const updatedPayment = await paymentModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedPayment) {
            return res.status(404).json({ msg: 'Payment not found' });
        }
        res.json(updatedPayment);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};