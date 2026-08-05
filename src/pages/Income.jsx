import "./Income.css";
import { useState } from "react";

import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";

import { db } from "../firebase/firebase";

function Income() {
  const [incomeName, setIncomeName] = useState("");
  const [amount, setAmount] = useState("");
  const [incomeList, setIncomeList] = useState([]);

  const addIncome = async () => {
    try {
      if (!incomeName || !amount) {
        alert("Please fill all fields.");
        return;
      }

      await addDoc(collection(db, "income"), {
        incomeName,
        amount: Number(amount),
        createdAt: new Date(),
      });

      alert("Income added successfully!");

      setIncomeName("");
      setAmount("");

      getIncome();
    } catch (error) {
      alert(error.message);
    }
  };

  const getIncome = async () => {
    try {
      const querySnapshot = await getDocs(
        collection(db, "income")
      );

      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setIncomeList(data);
    } catch (error) {
      alert(error.message);
    }
  };

  const deleteIncome = async (id) => {
    try {
      await deleteDoc(doc(db, "income", id));

      alert("Income deleted successfully!");

      getIncome();
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="income-container">
      <h1>💵 Income Tracker</h1>

      <div className="income-form">
        <input
          type="text"
          placeholder="Income Source"
          value={incomeName}
          onChange={(e) =>
            setIncomeName(e.target.value)
          }
        />

        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) =>
            setAmount(e.target.value)
          }
        />

        <button onClick={addIncome}>
          Add Income
        </button>

        <button onClick={getIncome}>
          Show Income
        </button>
      </div>

      <div className="income-list">
        {incomeList.map((item) => (
          <div
            key={item.id}
            className="income-card"
          >
            <h3>{item.incomeName}</h3>

            <p>₹{item.amount}</p>

            <button
              onClick={() =>
                deleteIncome(item.id)
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

export default Income;