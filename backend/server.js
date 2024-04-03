const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Bodyparser Middleware
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

// Define Routes
app.use('/api/items', require('./routes/itemRoutes'));
app.use('/api/payments', require('./routes/paymentRoutes'));
app.use('/api/cardpayments', require('./routes/cardDetailsRoute'));
app.use('/api/membershipPayments', require('./routes/membershipPaymentRoute'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

//udcwickramarathna
//byPUKaUiqRQMKOag