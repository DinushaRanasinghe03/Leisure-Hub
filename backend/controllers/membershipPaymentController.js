
import speakeasy from "speakeasy";
import nodemailer from "nodemailer";
import MembershipPayment from "../models/MembershipPayment.js";

const transporter = nodemailer.createTransport({
    host: 'app.debugmail.io',
    port: 25,
    auth: {
      user: 'f4185e42-cff0-447f-ae38-b3ab49d43e6c',
      pass: '4fe878b5-0930-439a-94e1-96ed4e2b67f1'
    }
});

export const getPayments = async (req, res) => {
    try {
        const mempayments = await MembershipPayment.find();
        res.json(mempayments);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

export const addPayment = async (req, res) => {
    try {
        const newPayment = new MembershipPayment({
            cvv: req.body.cvv,
            expDate: req.body.expDate,
            cardNumber: req.body.cardNumber,
            nameOnCard: req.body.nameOnCard
        });
        //const verifyResponse = await verifyOTP(req.body.secret, req.body.otp);

        const mempayments = await newPayment.save();
        res.json(mempayments);
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
            const deletedCardPayment = await MembershipPayment.findByIdAndDelete(req.body.card_id);
            res.json({ msg: 'Please Try Again', deletedCardPayment });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('Can not Verify Card');
    }
}

//new


export const getPaymentById = async (req, res) => {
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

//new
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