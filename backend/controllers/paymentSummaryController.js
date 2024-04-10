const booking = require('../models/PaymentSummary');
const movies = require('../models/PaymentMovie');
const movieschedule = require('../models/PaymentSchedule');
exports.getPaymentSummary = async (req, res) => {
    try {
        const paymentsummary = await booking.find().populate({
            path: 'movie',
            select: 'name'
        }).populate('schedule');
        res.json(paymentsummary);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.getTotal = async (req, res) => {
    try {
        const sumResult = await booking.aggregate([
            {
                $group: {
                    _id: null, // Group all documents into a single group
                    totalAmount: { $sum: { $toDouble: "$total" } }
                }
            },
            {
                $project: {
                    _id: 0, // Exclude the _id field from the output
                    totalAmount: 1 // Include the totalAmount field
                }
            }
        ]);

        const sum = sumResult.length > 0 ? sumResult[0].totalAmount : 0;
        res.json(sum);

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
}

// exports.addPayment = async (req, res) => {
//     try {
//         const newPayment = new Payment({
//             name: req.body.name,
//             number: req.body.number,
//             address: req.body.address,
//             email: req.body.email,
//             is_card_payment: req.body.is_card_payment
//         });
//         const payment = await newPayment.save();
//         res.json(payment);
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server Error');
//     }
// };

// exports.deletePayment = async (req, res) => {
//     try {
//         const deletedPayment = await Payment.findByIdAndDelete(req.params.id);
//         if (!deletedPayment) {
//             return res.status(404).json({ msg: 'Payment not found' });
//         }
//         res.json({ msg: 'Payment removed', deletedPayment });
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server Error');
//     }
// };


//new


exports.getPaymentSummaryById = async (req, res) => {
    try {
        const paymentSummary = await booking.findById(req.params.id);
        if (!paymentSummary) {
            return res.status(404).json({ msg: 'Payment summary not found' });
        }
        res.json(paymentSummary);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// exports.editPayment = async (req, res) => {
//     try {
//         const updatedPayment = await Payment.findByIdAndUpdate(req.params.id, req.body, { new: true });
//         if (!updatedPayment) {
//             return res.status(404).json({ msg: 'Payment not found' });
//         }
//         res.json(updatedPayment);
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server Error');
//     }
// };
