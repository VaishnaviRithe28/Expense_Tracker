window.onload = function () {
    // Add Popup Elements
    const openAddButton = document.getElementById("add");
    const closeAddButton = document.querySelector(".popup .close-add");
    const addPopup = document.querySelector(".popup");

    // Delete Popup Elements
    const closeDeleteButton = document.querySelector(".popup2 .close-delete");
    const deletePopup = document.querySelector(".popup2");

    // Open Add Popup
    openAddButton.addEventListener("click", function () {
        addPopup.style.display = "block";
        setTimeout(() => {
            addPopup.style.display = "none";
        }, 1500);
    });

    // Close Add Popup
    closeAddButton.addEventListener("click", function () {
        addPopup.style.display = "none";
    });

    // Close Delete Popup
    closeDeleteButton.addEventListener("click", function () {
        deletePopup.style.display = "none";
    });
};

// Expense Tracking Logic
let expenses = [];
let totalAmount = 0;

const whoPaidInput = document.getElementById("who-paid");
const amountInput = document.getElementById("amount");
const purposeInput = document.getElementById("purpose");
const dateInput = document.getElementById("date-input");
const participantsInput = document.getElementById("participants");
const tableBody = document.getElementById("expense-table-body");
const totalDisplay = document.getElementById("total-amount");

// Function to Add Expense
async function  AddData() {
    const purpose = purposeInput.value.trim();
    const amount = Number(amountInput.value);
    const date = dateInput.value;
    const whoPaid = whoPaidInput.value.trim();
    const participants = participantsInput.value.trim();

    // Input Validation
    if (!purpose || !whoPaid || !participants || !date || isNaN(amount) || amount <= 0) {
        alert("Please fill in all fields with valid values.");
        return;
    }

    const participantList = participants.split(",").map(p => p.trim()).filter(p => p);
    if (participantList.includes(whoPaid)) {
        alert("Payer should not be included in participants.");
        return;
    }

    const perPersonShare = amount / (participantList.length + 1); // Including payer

    const expense = { purpose, amount, date, whoPaid, participants, perPersonShare };
    expenses.push(expense);

    totalAmount += amount;
    totalDisplay.textContent = totalAmount.toFixed(2);

    // addExpenseToTable(expense);
    // clearInputs();
    try {
    const response = await fetch("http://localhost:5000/add-expense", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            type: "group",
            purpose,
            whoPaid: whoPaid,
            participants: participantList,
            amount
        })
    });

    // const data = await response.json();
    // console.log(data);

    // addExpenseToTable(expense);
    // clearInputs();
    const data = await response.json();

    if (response.ok) {
        console.log(data);
        addExpenseToTable(expense);
        clearInputs();
    } else {
        alert(data.error);
    }
    } catch (err) {
    console.error(err);
    alert("Failed to save expense");
}
}

// Function to Add Expense to Table
function addExpenseToTable(expense) {
    const newRow = tableBody.insertRow();

    newRow.innerHTML = `
        <td>${expense.whoPaid}</td>
        <td>${expense.amount}</td>
        <td>${expense.purpose}</td>
        <td>${expense.date}</td>
        <td>${expense.participants}</td>
        <td>${expense.perPersonShare.toFixed(2)}</td>
        <td><button class="delete-btn">Delete</button></td>
    `;

    // Add Delete Event
    newRow.querySelector(".delete-btn").addEventListener("click", function () {
        deleteExpense(expense, newRow);
    });
}

// Function to Delete Expense
function deleteExpense(expense, row) {
    const index = expenses.indexOf(expense);
    if (index !== -1) {
        expenses.splice(index, 1);
        totalAmount -= expense.amount;
        totalDisplay.textContent = totalAmount.toFixed(2);
        row.remove();
    }

    // Show delete confirmation popup
    deletePopup.style.display = "block";
    setTimeout(() => {
        deletePopup.style.display = "none";
    }, 1500);
}

// Function to Clear Input Fields
function clearInputs() {
    purposeInput.value = "";
    amountInput.value = "";
    dateInput.value = "";
    whoPaidInput.value = "";
    participantsInput.value = "";
}

// window.onload = function () {
//     // Add Popup Elements
//     const openAddButton = document.getElementById("add");
//     const closeAddButton = document.querySelector(".popup .close-add");
//     const addPopup = document.querySelector(".popup");

//     // Delete Popup Elements
//     const closeDeleteButton = document.querySelector(".popup2 .close-delete");
//     const deletePopup = document.querySelector(".popup2");

//     // Open Add Popup
//     openAddButton.addEventListener("click", function () {
//         addPopup.style.display = "block";
//         setTimeout(() => {
//             addPopup.style.display = "none";
//         }, 1500);
//     });

//     // Close Add Popup
//     closeAddButton.addEventListener("click", function () {
//         addPopup.style.display = "none";
//     });

//     // Close Delete Popup
//     closeDeleteButton.addEventListener("click", function () {
//         deletePopup.style.display = "none";
//     });
// };

// // Expense Tracking Logic
// let expenses = [];
// let totalAmount = 0;

// const whoPaidInput = document.getElementById("who-paid");
// const amountInput = document.getElementById("amount");
// const purposeInput = document.getElementById("purpose");
// const dateInput = document.getElementById("date-input");
// const participantsInput = document.getElementById("participants");
// const tableBody = document.getElementById("expense-table-body");
// const totalDisplay = document.getElementById("total-amount");

// // Function to Add Expense
// function AddData() {
//     const purpose = purposeInput.value.trim();
//     const amount = Number(amountInput.value);
//     const date = dateInput.value;
//     const whopaid = whopaidInput.value;
//     const participants = participantsInput.value;

//     if (purpose === "") {
//         alert("Please enter a purpose.");
//         return;
//     }
//     if(whopaid === ""){
//         alert("Please enter name.");
//         return;
//     }
//     if(participants ===""){
//         alert("Please enter participants.");
//         return;
//     }
//     if (isNaN(amount) || amount <= 0) {
//         alert("Please enter a valid amount.");
//         return;
//     }
//     if (date === "") {
//         alert("Please select a date.");
//         return;
//     }

//     const expense = { purpose, amount, date,whopaid,participants };
//     expenses.push(expense);
//     totalAmount += amount;
//     totalDisplay.textContent = totalAmount;

//     addExpenseToTable(expense);
//     clearInputs();
// }

// // Function to Add Expense to Table
// function addExpenseToTable(expense) {
//     const newRow = tableBody.insertRow();

//     const whopaidCell = newRow.insertCell(0);
//     const amountCell = newRow.insertCell(1);
//     const purposeCell = newRow.insertCell(2);
//     const whenCell = newRow.insertCell(3);
//     const participantsCell = newRow.insertCell(4);
//     const foryouCell = newRow.insertCell(5);
//     const deleteCell = newRow.insertCell(6);

//     purposeCell.textContent = expense.purpose;
//     whopaidCell.textContent = expense.whopaid;
//     participantsCell.textContent = expense.participants;
//     whenCell.textContent = expense.date;
//     amountCell.textContent = expense.amount;


//     const deleteBtn = document.createElement("button");
//     deleteBtn.textContent = "Delete";
//     deleteBtn.classList.add("delete-btn");
//     deleteBtn.addEventListener("click", function () {
//         deleteExpense(expense, newRow);
//     });

//     deleteCell.appendChild(deleteBtn);
// }

// // Function to Delete Expense
// function deleteExpense(expense, row) {
//     const index = expenses.indexOf(expense);
//     if (index !== -1) {
//         expenses.splice(index, 1);
//         totalAmount -= expense.amount;
//         totalDisplay.textContent = totalAmount;
//         row.remove();
//     }

//     // Show delete confirmation popup
//     const deletePopup = document.querySelector(".popup2");
//     deletePopup.style.display = "block";
//     setTimeout(() => {
//         deletePopup.style.display = "none";
//     }, 1500);
// }

// // Function to Clear Input Fields
// function clearInputs() {
//     purposeInput.value = "";
//     amountInput.value = "";
//     dateInput.value = "";
//     whopaidInput.value="";
//     participantsInput.value="";
    
// }

// // wind
// // window.onload = function () {
// //     // Add Popup Elements
// //     const openAddButton = document.querySelector(".open-add");
// //     const closeAddButton = document.querySelector(".popup .close-add");
// //     const addPopup = document.querySelector(".popup");

// //     // Delete Popup Elements
// //     const openDeleteButton = document.querySelector(".open-delete");
// //     const closeDeleteButton = document.querySelector(".popup2 .close-delete");
// //     const deletePopup = document.querySelector(".popup2");

// //     // Open Add Popup
// //     openAddButton.addEventListener("click", function () {
// //         addPopup.style.display = "block";
// //     });

// //     // Close Add Popup
// //     closeAddButton.addEventListener("click", function () {
// //         addPopup.style.display = "none";
// //     });

// //     // Open Delete Popup
// //     openDeleteButton.addEventListener("click", function () {
// //         deletePopup.style.display = "block";
// //     });

// //     // Close Delete Popup
// //     closeDeleteButton.addEventListener("click", function () {
// //         deletePopup.style.display = "none";
// //     });
// // };
