const MembershipPayment = require('../models/MembershipPayment');

exports.getPayments = async (req, res) => {
    try {
        const mempayments = await MembershipPayment.find();
        res.json(mempayments);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.addPayment = async (req, res) => {
    try {
        const newPayment = new MembershipPayment({
            cvv: req.body.cvv,
            expDate: req.body.expDate,
            cardNumber: req.body.cardNumber,
            nameOnCard: req.body.nameOnCard
        });
        const mempayments = await newPayment.save();
        res.json(mempayments);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};



//new


exports.getPaymentById = async (req, res) => {
    try {
        const mempayments = await MembershipPayment.findById(req.params.id);
        if (!mempayments) {
            return res.status(404).json({ msg: 'Payment not found' });
        }
        res.json(mempayments);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

