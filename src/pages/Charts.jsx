import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

function Charts() {
  const [labels, setLabels] = useState([]);
  const [amounts, setAmounts] = useState([]);

  useEffect(() => {
    getExpenseData();
  }, []);

  const getExpenseData = async () => {
    try {
      const querySnapshot = await getDocs(
        collection(db, "expense")
      );

      const expenseLabels = [];
      const expenseAmounts = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();

        expenseLabels.push(data.expenseName);
        expenseAmounts.push(data.amount);
      });

      setLabels(expenseLabels);
      setAmounts(expenseAmounts);
    } catch (error) {
      console.log(error);
    }
  };

  const data = {
    labels: labels,

    datasets: [
      {
        label: "Expenses",
        data: amounts,

        backgroundColor: [
          "#3b82f6",
          "#10b981",
          "#f59e0b",
          "#ef4444",
          "#8b5cf6",
          "#ec4899",
        ],
      },
    ],
  };

  return (
    <div
      style={{
        width: "500px",
        margin: "50px auto",
      }}
    >
      <h1>Expense Chart</h1>

      <Pie data={data} />
    </div>
  );
}

export default Charts;