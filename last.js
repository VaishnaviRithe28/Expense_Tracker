// last.js

const tableBody = document.getElementById("expense-body");
const totalDisplay = document.getElementById("total");

async function loadExpenses() {
    try {
        const response = await fetch("http://localhost:5000/get-expenses");

        if (!response.ok) {
            throw new Error("Failed to fetch expenses");
        }

        const expenses = await response.json();

        tableBody.innerHTML = "";

        let totalAmount = 0;

        expenses.forEach(expense => {
            totalAmount += expense.amount;

            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${expense.type}</td>
                <td>${expense.purpose}</td>
                <td>${expense.whoPaid}</td>
                <td>${expense.participants.length ? expense.participants.join(", ") : "-"}</td>
                <td>${new Date(expense.date).toLocaleDateString()}</td>
                <td>₹${expense.amount}</td>
            `;

            tableBody.appendChild(row);
        });

        totalDisplay.textContent = "₹" + totalAmount.toFixed(2);

    } catch (err) {
        console.error("Error:", err);
        alert("Unable to load expenses.");
    }
}

window.onload = loadExpenses;