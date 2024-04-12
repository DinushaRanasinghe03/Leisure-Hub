import speakeasy from "speakeasy";
import nodemailer from "nodemailer";

import CardPayment from "../models/cardDetails.js";

const transporter = nodemailer.createTransport({
    host: 'app.debugmail.io',
    port: 25,
    auth: {
      user: 'f4185e42-cff0-447f-ae38-b3ab49d43e6c',
      pass: '4fe878b5-0930-439a-94e1-96ed4e2b67f1'
    }
});

//get all
export const getCardPayments = async (req, res) => {
    try {
        const cardpayments = await CardPayment.find().populate('payment');
        res.json(cardpayments);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};


//create
export const addCardPayment = async (req, res) => {
    try {
        let cardPayment = {};
        const newCardPayment = new CardPayment({
            nameOnCard: req.body.nameOnCard,
            cardNumber: req.body.cardNumber,
            expDate: req.body.expDate,
            cvv: req.body.cvv,
            payment: req.body.payment,
        });

        const verifyResponse = await verifyOTP(req.body.secret, req.body.otp);

        // if (verifyResponse) {
            cardPayment = await newCardPayment.save();
        // } else {
        //     cardPayment = {
        //         msg: "Error in verification"
        //     }
        // }
        res.json(cardPayment);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

//send otp
export const sendOTPtoEmail = async (req, res) => {
    try {
        const { secret, otp } = await generateOTP();
        const email = await req.body.email;
        const resSendEmail = await sendOTPByEmail(email, otp);
        const response = { 
            secret: secret, 
            otp: otp 
        }
        console.log("res",response);
        res.json(response);
    } catch (err) {
        console.log(err);
        res.status(500).send('Server Error');
    }
};


//verify otp

export const verifyOTPByEmail = async (req, res) => {
    try {
        const otp = await req.body.otp;
        const secret = await req.body.secret;

        const verify = await verifyOTP(secret, otp);
        console.log(req.body.card_id);
        console.log("verify", verify);
        if (verify) {
            res.status(200).json({verification: verify});
        } else {
            const deletedCardPayment = await CardPayment.findByIdAndDelete(req.body.card_id);
            res.json({ msg: 'Please Try Again', deletedCardPayment });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('Can not Verify Card');
    }
}

//delete
export const deleteCardPayment = async (req, res) => {
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
export const getCardPaymentById = async (req, res) => {
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
export const editCardPayment = async (req, res) => {
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
    let mailOptions = {
        from: 'f4185e42-cff0-447f-ae38-b3ab49d43e6c@debugmail.io', // Enter sender email
        to: email, // Enter receiver email
        subject: 'Your OTP', // Email subject
        text: `Your OTP is: ${otp} `// Email body
    };

    // Send email
    let info = await transporter.sendMail(mailOptions);
    console.log('Message sent: %s', info.messageId);
    return info;
}

async function verifyOTP(secret, otp) {
    return speakeasy.totp.verify({
        secret: secret,
        encoding: 'ascii',
        token: otp,
        window: 2 
    });
}