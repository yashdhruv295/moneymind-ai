import "./Expense.css";
import { useState } from "react";

import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";

import { db } from "../firebase/firebase";

function Expense() {
  const [expenseName, setExpenseName] = useState("");
  const [amount, setAmount] = useState("");
  const [expenseList, setExpenseList] = useState([]);

  // Add Expense
  const addExpense = async () => {
    try {
      if (!expenseName || !amount) {
        alert("Please fill all fields.");
        return;
      }

      await addDoc(collection(db, "expense"), {
        expenseName,
        amount: Number(amount),
        createdAt: new Date(),
      });

      alert("Expense added successfully!");

      setExpenseName("");
      setAmount("");

      getExpense();
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };

  // Show Expense
  const getExpense = async () => {
    try {
      const querySnapshot = await getDocs(
        collection(db, "expense")
      );

      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setExpenseList(data);
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };

  // Delete Expense
  const deleteExpense = async (id) => {
    try {
      await deleteDoc(doc(db, "expense", id));

      alert("Expense deleted successfully!");

      getExpense();
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };

  return (
    <div className="expense-container">
      <h1>💸 Expense Tracker</h1>

      <div className="expense-form">
        <input
          type="text"
          placeholder="Expense Name"
          value={expenseName}
          onChange={(e) => setExpenseName(e.target.value)}
        />

        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <button onClick={addExpense}>
          Add Expense
        </button>

        <button onClick={getExpense}>
          Show Expense
        </button>
      </div>

      <div className="expense-list">
        {expenseList.map((item) => (
          <div
            key={item.id}
            className="expense-card"
          >
            <h3>{item.expenseName}</h3>

            <p>₹{item.amount}</p>

            <button
              onClick={() =>
                deleteExpense(item.id)
              }
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Expense;