const speakeasy = require('speakeasy');
const nodemailer = require('nodemailer');
const CardPayment = require('../models/cardDetails');

const transporter = nodemailer.createTransport({
    host: "gmail",
    auth: {
        user: "email@gmail.com",
        pass: "password",
    },
});

//get all
exports.getCardPayments = async (req, res) => {
    try {
        const cardpayments = await CardPayment.find().populate('payment');
        res.json(cardpayments);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};


//create
exports.addCardPayment = async (req, res) => {
    try {
        const newCardPayment = new CardPayment({
            nameOnCard: req.body.nameOnCard,
            cardNumber: req.body.cardNumber,
            expDate: req.body.expDate,
            cvv: req.body.cvv,
            payment: req.body.payment,
        });

        const { secret, otp } = await generateOTP();

        const email = 'himashiamaya17@gmail.com'

        const resSendEmail = await sendOTPByEmail(email, otp);

        const cardPayment = await newCardPayment.save();
        res.json(cardPayment);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};


//delete
exports.deleteCardPayment = async (req, res) => {
    try {
        const deletedCardPayment = await CardPayment.findByIdAndDelete(req.params.id);
        if (!deletedCardPayment) {
            return res.status(404).json({ msg: 'Card Payment not found' });
        }
        res.json({ msg: 'Payment removed', deletedCardPayment });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};


//single get
exports.getCardPaymentById = async (req, res) => {
    try {
        const cardPayment = await CardPayment.findById(req.params.id).populate('payment');
        if (!cardPayment) {
            return res.status(404).json({ msg: 'Card Payment not found' });
        }
        res.json(cardPayment);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};


//edit
exports.editCardPayment = async (req, res) => {
    try {
        const updatedCardPayment = await CardPayment.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedCardPayment) {
            return res.status(404).json({ msg: 'Card Payment not found' });
        }
        res.json(updatedCardPayment);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Generate a new secret and OTP URI
async function generateOTP() {
    const secret = speakeasy.generateSecret({ length: 10 }); // 10 bytes will be equivalent to 80 bits
    const otp = await generateTOTP(secret.ascii);  
    return {
        secret: secret.ascii,
        otp
    };
}

async function generateTOTP(secret) {
    return speakeasy.totp({
        secret: secret,
        encoding: 'ascii',
        digits: 6 // Set to 6 digits
    });
}

// Send OTP via email
async function sendOTPByEmail(email, otp) {
    // Create a SMTP transporter
    // Setup email data
    let mailOptions = {
        from: 'wickcha95@gmail.com', // Enter sender email
        to: email, // Enter receiver email
        subject: 'Your OTP', // Email subject
        text: `Your OTP is: ${otp} `// Email body
    };

    // Send email
    let info = await transporter.sendMail(mailOptions);
    console.log('Message sent: %s', info.messageId);
}
