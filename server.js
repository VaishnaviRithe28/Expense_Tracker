const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/groupExpenseDB")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error(" MongoDB Error:", err));

// Define Schema
// const expenseSchema = new mongoose.Schema({
//     purpose: String,
//     whoPaid: String,
//     participants: [String],
//     amount: Number,
//     date: { type: Date, default: Date.now }
// });
const expenseSchema = new mongoose.Schema({
    type: String, // personal or group
    purpose: String,
    whoPaid: String,
    participants: [String],
    amount: Number,
    date: { type: Date, default: Date.now }
});
// Create Model
const Expense = mongoose.model("Expense", expenseSchema);

// Route to Add Expense
app.post("/add-expense", async (req, res) => {
    try {
        // const { purpose, whoPaid, participants, amount } = req.body;

        // const newExpense = new Expense({
        //     purpose,
        //     whoPaid,
        //     participants,
        //     amount
        // });
        const { type, purpose, whoPaid, participants, amount } = req.body;

        const newExpense = new Expense({
            type,
            purpose,
            whoPaid,
            participants,
            amount
            });
        await newExpense.save();
        console.log("Saved:", newExpense);
        res.json({
            message: "Expense added successfully",
            expense: newExpense
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to add expense" });
    }
});

// Route to Get Expenses
app.get("/get-expenses", async (req, res) => {
    try {
        const expenses = await Expense.find();
        res.json(expenses);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch expenses" });
    }
});

// Start Server
app.listen(5000, () => console.log("Server running on port 5000"));
