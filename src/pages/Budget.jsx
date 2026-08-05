import "./Budget.css";
import { useState } from "react";

import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";

import { db } from "../firebase/firebase";

function Budget() {
  const [budget, setBudget] = useState("");
  const [budgetList, setBudgetList] = useState([]);

  // Save budget

  const saveBudget = async () => {
    try {
      if (!budget) {
        alert("Please enter your budget.");
        return;
      }

      await addDoc(collection(db, "budget"), {
        amount: Number(budget),
        createdAt: new Date(),
      });

      alert("Budget saved successfully!");

      setBudget("");

      getBudget();
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };

  // Show budget

  const getBudget = async () => {
    try {
      const querySnapshot = await getDocs(
        collection(db, "budget")
      );

      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setBudgetList(data);
    } catch (error) {
      alert(error.message);
    }
  };

  // Delete budget

  const deleteBudget = async (id) => {
    try {
      await deleteDoc(doc(db, "budget", id));

      alert("Budget deleted successfully!");

      getBudget();
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="budget-container">
      <h1>📊 Budget Planner</h1>

      <div className="budget-form">
        <input
          type="number"
          placeholder="Enter monthly budget"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
        />

        <button onClick={saveBudget}>
          Save Budget
        </button>

        <button onClick={getBudget}>
          Show Budget
        </button>
      </div>

      <div className="budget-list">
        {budgetList.map((item) => (
          <div
            key={item.id}
            className="budget-card"
          >
            <h3>₹{item.amount}</h3>

            <button
              onClick={() =>
                deleteBudget(item.id)
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

export default Budget;