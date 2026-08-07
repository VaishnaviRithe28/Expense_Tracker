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
    loadExpenses();
};

// Expense Tracking Logic
let expenses = [];
let totalAmount = 0;

const purposeInput = document.getElementById("purpose");
const amountInput = document.getElementById("amount");
const dateInput = document.getElementById("date-input");
const tableBody = document.getElementById("expense-table-body");
const totalDisplay = document.getElementById("total-amount");

// Function to Add Expense
async function AddData() {
    const purpose = purposeInput.value.trim();
    const amount = Number(amountInput.value);
    const date = dateInput.value;

    if (purpose === "") {
        alert("Please enter a purpose.");
        return;
    }
    if (isNaN(amount) || amount <= 0) {
        alert("Please enter a valid amount.");
        return;
    }
    if (date === "") {
        alert("Please select a date.");
        return;
    }

    const expense = { purpose, amount, date };
    // expenses.push(expense);
//     const response = await fetch("http://localhost:5000/add-expense", {
//     method: "POST",
//     headers: {
//         "Content-Type": "application/json"
//     },
//     body: JSON.stringify({
//         type: "personal",
//         purpose,
//         amount,
//         whoPaid: "Personal",
//         participants: []
//     })
// });
//     const data = await response.json();

// if (!response.ok) {
//     alert(data.error);
//     return;
// }

// console.log(data);
//     totalAmount += amount;
//     totalDisplay.textContent = totalAmount;

//     addExpenseToTable(expense);
//     clearInputs();
    try {
    const response = await fetch("http://localhost:5000/add-expense", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            type: "personal",
            purpose,
            amount,
            whoPaid: "Personal",
            participants: []
        })
    });

    const data = await response.json();

    if (!response.ok) {
        alert(data.error);
        return;
    }

    console.log(data);

    expenses.push(expense);
    totalAmount += amount;
    totalDisplay.textContent = totalAmount;

    addExpenseToTable(expense);
    clearInputs();

} catch (err) {
    console.error(err);
    alert("Failed to save expense");
}
}

// Function to Add Expense to Table
function addExpenseToTable(expense) {
    const newRow = tableBody.insertRow();

    const purposeCell = newRow.insertCell(0);
    const whenCell = newRow.insertCell(1);
    const amountCell = newRow.insertCell(2);
    const deleteCell = newRow.insertCell(3);

    purposeCell.textContent = expense.purpose;
    whenCell.textContent = expense.date;
    amountCell.textContent = expense.amount;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.addEventListener("click", function () {
        deleteExpense(expense, newRow);
    });

    deleteCell.appendChild(deleteBtn);
}

// Function to Delete Expense
function deleteExpense(expense, row) {
    const index = expenses.indexOf(expense);
    if (index !== -1) {
        expenses.splice(index, 1);
        totalAmount -= expense.amount;
        totalDisplay.textContent = totalAmount;
        row.remove();
    }

    // Show delete confirmation popup
    const deletePopup = document.querySelector(".popup2");
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
}
async function loadExpenses() {
    try {
        const response = await fetch("http://localhost:5000/get-expenses");
        const data = await response.json();

        expenses = [];
        totalAmount = 0;
        tableBody.innerHTML = "";

        data.forEach(expense => {
            if (expense.type === "personal") {
                expenses.push(expense);
                totalAmount += expense.amount;

                addExpenseToTable({
                    purpose: expense.purpose,
                    amount: expense.amount,
                    date: new Date(expense.date).toLocaleDateString()
                });
            }
        });

        totalDisplay.textContent = totalAmount.toFixed(2);

    } catch (err) {
        console.error(err);
    }
}
// window.onload = function () {
//     // Add Popup Elements
//     const openAddButton = document.querySelector(".open-add");
//     const closeAddButton = document.querySelector(".popup .close-add");
//     const addPopup = document.querySelector(".popup");

//     // Delete Popup Elements
//     const openDeleteButton = document.querySelector(".open-delete");
//     const closeDeleteButton = document.querySelector(".popup2 .close-delete");
//     const deletePopup = document.querySelector(".popup2");

//     // Open Add Popup
//     openAddButton.addEventListener("click", function () {
//         addPopup.style.display = "block";
//     });

//     // Close Add Popup
//     closeAddButton.addEventListener("click", function () {
//         addPopup.style.display = "none";
//     });

//     // Open Delete Popup
//     openDeleteButton.addEventListener("click", function () {
//         deletePopup.style.display = "block";
//     });

//     // Close Delete Popup
//     closeDeleteButton.addEventListener("click", function () {
//         deletePopup.style.display = "none";
//     });
// };


// let expenses=[];
// let totalamount=0;
// const categoryselect = document.getElementById('purpose')
// const amount = document.getElementById('amount')
// const dateinput= document.getElementById('date-input')
// const add = document.getElementById('add')
// const delet = document.getElementById('delete')
// const table = document.getElementById('expense-table-body')
// const total = document.getElementById('total-amount')

// add.addEventListener('click',function(){
//     const category = categoryselect.value;
//     const amount = Number(amount.value);
//     const date = dateinput.value;

//     if(category === ''){
//         alert("Please select a category");
//         return;
//     }
//     if(isNaN(amount) || amount<=0 ){
//         alert('Please enter a valid amount');
//         return;
//     }
//     if(date === ''){
//         alert('Please select a date');
//         return;
//     }
//     expenses.push(category,amount,date)
//     totalamount += amount;
//     total.textContent=totalamount;

//     const newrow = table.insertRow();

//     const purposecell= newrow.insertRow();
//     const amountcell = newrow.insertRow();
//     const whencell = newrow.insertRow();
//     const deletecell = newrow.insertRow();

//     const deletebtn = document.createElement('button');

//     deletebtn.textContent = 'Delete';
//     deletebtn.classlist.add('delete-btn');
//     deletebtn.addEventListener('click', function(){
//         expenses.splice(expenses.indexOf(expense),1);

//         totalamount -= expense.amount;
//         totalamouncell.textContent = totalamount;

//         table.removeChild(newrow);
//     })
//     const expense= expenses[expenses.length - 1];
//     purposecell.textContent=expense.category;
//     amountcell.textContent=expense.amount;
//     whencell.textContent=expense.date;
//     deletecell.appendchild(deletebtn);

// })
// for(const expense of expenses){
//     totalamount += amount;
//     total.textContent=totalamount;

//     const newrow = table.insertRow();

//     const purposecell= newrow.insertRow();
//     const amountcell = newrow.insertRow();
//     const whencell = newrow.insertRow();
//     const deletecell = newrow.insertRow();

//     const deletebtn = document.createElement('button');

//     deletebtn.textContent = 'Delete';
//     deletebtn.classlist.add('delete-btn');
//     deletebtn.addEventListener('click', function(){
//         expenses.splice(expenses.indexOf(expense),1);

//         totalamount -= expense.amount;
//         totalamouncell.textContent = totalamount;

//         table.removeChild(newrow);
//     })
//     const expense= expenses[expenses.length - 1];
//     purposecell.textContent=expense.category;
//     amountcell.textContent=expense.amount;
//     whencell.textContent=expense.date;
//     deletecell.appendchild(deletebtn);

// }
