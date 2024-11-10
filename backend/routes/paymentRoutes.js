// ~/Desktop/pacifica/backend/routes/paymentRoutes.js
const express = require('express');
const router = express.Router();

// Mock data for testing
let transactions = [
    { paymentId: '1', amount: 100, status: 'Completed' },
    { paymentId: '2', amount: 50, status: 'Pending' }
];

// Route to get transaction history
router.get('/transaction-history', (req, res) => {
    res.json(transactions);
});

// Route to create a payment
router.post('/create-payment', (req, res) => {
    const { amount, currency, description } = req.body;
    const paymentId = (transactions.length + 1).toString();
    const newTransaction = { paymentId, amount, status: 'Pending' };
    transactions.push(newTransaction);
    res.status(201).json(newTransaction);
});

// Route to verify a payment (mock implementation)
router.post('/verify-eft', (req, res) => {
    const { paymentId } = req.body;
    const transaction = transactions.find(tx => tx.paymentId === paymentId);
    if (transaction) {
        transaction.status = 'Completed'; // Mock verification
        res.json({ success: true, message: 'Payment verified successfully!', transaction });
    } else {
        res.status(404).json({ success: false, message: 'Payment not found.' });
    }
});

module.exports = router;
