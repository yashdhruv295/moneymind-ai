import "./Savings.css";
import { useState } from "react";

import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";

import { db } from "../firebase/firebase";

function Savings() {
  const [goal, setGoal] = useState("");
  const [amount, setAmount] = useState("");
  const [savingsList, setSavingsList] = useState([]);

  // Add savings
  const addSavings = async () => {
    try {
      if (!goal || !amount) {
        alert("Please fill all fields.");
        return;
      }

      await addDoc(collection(db, "savings"), {
        goal,
        amount: Number(amount),
        createdAt: new Date(),
      });

      alert("Savings added successfully!");

      setGoal("");
      setAmount("");

      getSavings();
    } catch (error) {
      alert(error.message);
    }
  };

  // Show savings
  const getSavings = async () => {
    try {
      const querySnapshot = await getDocs(
        collection(db, "savings")
      );

      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setSavingsList(data);
    } catch (error) {
      alert(error.message);
    }
  };

  // Delete savings
  const deleteSavings = async (id) => {
    try {
      await deleteDoc(doc(db, "savings", id));

      alert("Savings deleted successfully!");

      getSavings();
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="savings-container">
      <h1>💰 Savings Tracker</h1>

      <div className="savings-form">
        <input
          type="text"
          placeholder="Goal Name"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
        />

        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <button onClick={addSavings}>
          Add Savings
        </button>

        <button onClick={getSavings}>
          Show Savings
        </button>
      </div>

      <div className="savings-list">
        {savingsList.map((item) => (
          <div
            key={item.id}
            className="savings-card"
          >
            <h3>{item.goal}</h3>

            <p>₹{item.amount}</p>

            <button
              onClick={() =>
                deleteSavings(item.id)
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

export default Savings;