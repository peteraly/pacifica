// ~/Desktop/pacifica/frontend/script.js

const API_BASE_URL = 'https://us-central1-pacifica-8ee24.cloudfunctions.net/api';

// Function to create a payment
async function createPayment() {
    const amountInput = document.getElementById('amount');
    const amount = amountInput.value;

    if (!amount) {
        alert('Please enter an amount');
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/create-payment`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ amount })
        });
        const data = await response.json();
        document.getElementById('paymentId').innerText = `Payment ID: ${data.paymentId}`;
    } catch (error) {
        alert('Error creating payment. Please try again.');
        console.error(error);
    }
}

// Function to verify EFT
async function verifyEFT() {
    const paymentIdInput = document.getElementById('verifyPaymentId');
    const paymentId = paymentIdInput.value;

    if (!paymentId) {
        alert('Please enter a Payment ID');
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/verify-eft`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ paymentId })
        });
        const data = await response.json();
        document.getElementById('verifyResponse').innerText = data.success ? 
            `Payment ${paymentId} verified successfully!` : `Verification failed: ${data.message}`;
    } catch (error) {
        alert('Error verifying payment. Please try again.');
        console.error(error);
    }
}

// Function to fetch transaction history
async function fetchTransactionHistory() {
    try {
        const response = await fetch(`${API_BASE_URL}/transaction-history`);
        const transactions = await response.json();
        const transactionHistory = document.getElementById('transactionHistory');
        transactionHistory.innerHTML = '';
        transactions.forEach(transaction => {
            const li = document.createElement('li');
            li.innerText = `ID: ${transaction.paymentId}, Amount: ${transaction.amount}, Status: ${transaction.status}`;
            transactionHistory.appendChild(li);
        });
    } catch (error) {
        alert('Error fetching transaction history. Please try again.');
        console.error(error);
    }
}
