// ~/Desktop/pacifica/backend/controllers/paymentController.js
const Transaction = require('../models/Transaction');
const { v4: uuidv4 } = require('uuid');

exports.createPaymentIdentifier = async (req, res, next) => {
    const paymentId = uuidv4();
    const { amount } = req.body;

    try {
        const transaction = new Transaction({ paymentId, amount });
        await transaction.save();
        res.json({ paymentId });
    } catch (error) {
        next(error); // Passes error to error handling middleware
    }
};

exports.verifyEFT = async (req, res, next) => {
    const { paymentId } = req.body;

    try {
        const transaction = await Transaction.findOne({ paymentId });
        if (!transaction) {
            return res.status(404).json({ success: false, message: 'Transaction not found' });
        }

        transaction.status = 'completed';
        await transaction.save();
        res.json({ success: true, transaction });
    } catch (error) {
        next(error);
    }
};

exports.getTransactionHistory = async (req, res, next) => {
    try {
        const transactions = await Transaction.find();
        res.json(transactions);
    } catch (error) {
        next(error);
    }
};
