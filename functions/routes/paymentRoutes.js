// functions/routes/paymentRoutes.js
const express = require("express");
const router = express.Router();

// Example route for creating a payment
router.post("/create-payment", (req, res) => {
    res.json({ message: "Payment created" });
});

module.exports = router;
