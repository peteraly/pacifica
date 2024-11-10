// frontend/scripts/main.js
async function createPayment() {
    const amount = document.getElementById('amount').value;

    const response = await fetch('http://localhost:3001/api/payments/create-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount })
    });
    const data = await response.json();

    document.getElementById('paymentId').innerText = `Payment ID: ${data.paymentId}`;
}
