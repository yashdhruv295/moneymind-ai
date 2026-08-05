import "./Reports.css";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";

function Reports() {
  const [lifetimeIncome, setLifetimeIncome] = useState(0);
  const [lifetimeExpense, setLifetimeExpense] = useState(0);

  const [monthlyIncome, setMonthlyIncome] = useState(0);
  const [monthlyExpense, setMonthlyExpense] = useState(0);

  const [yearlyIncome, setYearlyIncome] = useState(0);
  const [yearlyExpense, setYearlyExpense] = useState(0);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      let totalIncome = 0;
      let totalExpense = 0;

      let monthIncome = 0;
      let monthExpense = 0;

      let yearIncome = 0;
      let yearExpense = 0;

      const currentDate = new Date();
      const currentMonth = currentDate.getMonth();
      const currentYear = currentDate.getFullYear();

      // Income data
      const incomeSnapshot = await getDocs(
        collection(db, "income")
      );

      incomeSnapshot.forEach((doc) => {
        const data = doc.data();
        const amount = Number(data.amount);

        totalIncome += amount;

        if (data.createdAt && data.createdAt.toDate) {
          const date = data.createdAt.toDate();

          if (date.getMonth() === currentMonth) {
            monthIncome += amount;
          }

          if (date.getFullYear() === currentYear) {
            yearIncome += amount;
          }
        }
      });

      // Expense data
      const expenseSnapshot = await getDocs(
        collection(db, "expense")
      );

      expenseSnapshot.forEach((doc) => {
        const data = doc.data();
        const amount = Number(data.amount);

        totalExpense += amount;

        if (data.createdAt && data.createdAt.toDate) {
          const date = data.createdAt.toDate();

          if (date.getMonth() === currentMonth) {
            monthExpense += amount;
          }

          if (date.getFullYear() === currentYear) {
            yearExpense += amount;
          }
        }
      });

      setLifetimeIncome(totalIncome);
      setLifetimeExpense(totalExpense);

      setMonthlyIncome(monthIncome);
      setMonthlyExpense(monthExpense);

      setYearlyIncome(yearIncome);
      setYearlyExpense(yearExpense);
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };

  return (
    <div className="reports-container">
      <h1>📈 Financial Reports</h1>

      {/* Lifetime Report */}
      <div className="report-card">
        <h2>📊 Lifetime Report</h2>

        <p>Total Income: ₹{lifetimeIncome}</p>

        <p>Total Expense: ₹{lifetimeExpense}</p>

        <p>
          Balance: ₹
          {lifetimeIncome - lifetimeExpense}
        </p>
      </div>

      {/* Monthly Report */}
      <div className="report-card">
        <h2>📅 Monthly Report</h2>

        <p>Total Income: ₹{monthlyIncome}</p>

        <p>Total Expense: ₹{monthlyExpense}</p>

        <p>
          Balance: ₹
          {monthlyIncome - monthlyExpense}
        </p>
      </div>

      {/* Yearly Report */}
      <div className="report-card">
        <h2>📈 Yearly Report</h2>

        <p>Total Income: ₹{yearlyIncome}</p>

        <p>Total Expense: ₹{yearlyExpense}</p>

        <p>
          Balance: ₹
          {yearlyIncome - yearlyExpense}
        </p>
      </div>
    </div>
  );
}

export default Reports;