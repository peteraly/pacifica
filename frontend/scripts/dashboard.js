// ~/Desktop/pacifica/frontend/scripts/dashboard.js
const API_BASE_URL = 'http://localhost:3001/api'; // Update with your actual local API URL

// Function to fetch transaction history
async function fetchTransactions() {
    try {
        const response = await fetch(`${API_BASE_URL}/payments/transaction-history`);
        
        if (!response.ok) {
            throw new Error('Network response was not ok: ' + response.statusText);
        }
        
        const transactions = await response.json();
        const tbody = document.querySelector('#transactionTable tbody');
        tbody.innerHTML = ''; // Clear previous entries

        transactions.forEach(transaction => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${transaction.paymentId}</td>
                <td>${transaction.amount}</td>
                <td>${transaction.status}</td>
            `;
            tbody.appendChild(row);
        });
    } catch (error) {
        console.error('Error fetching transaction history:', error);
        alert('Error fetching transaction history. Please try again later.');
    }
}

// Function to create a new payment
async function createPayment() {
    const amountInput = document.getElementById('amount');
    const amount = amountInput.value;

    if (!amount) {
        alert('Please enter an amount');
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/payments/create-payment`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ amount })
        });
        
        if (!response.ok) {
            throw new Error('Network response was not ok: ' + response.statusText);
        }

        const data = await response.json();
        alert(`Payment created with ID: ${data.paymentId}`);
        fetchTransactions(); // Refresh transaction history
    } catch (error) {
        console.error('Error creating payment:', error);
        alert('Error creating payment. Please try again later.');
    }
}

// Automatically fetch transactions on page load
document.addEventListener('DOMContentLoaded', fetchTransactions);
