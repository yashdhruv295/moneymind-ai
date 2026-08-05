import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";

import { db } from "../firebase/firebase";
import "./Dashboard.css";
import Sidebar from "../components/Sidebar";

function Dashboard() {
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [totalBalance, setTotalBalance] = useState(0);
  const [totalBudget, setTotalBudget] = useState(0);

  const [incomeData, setIncomeData] = useState([]);
  const [expenseData, setExpenseData] = useState([]);
  const [savingsData, setSavingsData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      let income = 0;
      let expense = 0;
      let budget = 0;

      // Income

      const incomeSnapshot = await getDocs(
        collection(db, "income")
      );

      const incomeList = incomeSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      incomeList.forEach((item) => {
        income += Number(item.amount);
      });

      // Expense

      const expenseSnapshot = await getDocs(
        collection(db, "expense")
      );

      const expenseList = expenseSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      expenseList.forEach((item) => {
        expense += Number(item.amount);
      });

      // Savings

      const savingsSnapshot = await getDocs(
        collection(db, "savings")
      );

      const savingsList = savingsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Budget

      const budgetSnapshot = await getDocs(
        collection(db, "budget")
      );

      budgetSnapshot.forEach((doc) => {
        budget += Number(doc.data().amount);
      });

      setIncomeData(incomeList);
      setExpenseData(expenseList);
      setSavingsData(savingsList);

      setTotalIncome(income);
      setTotalExpense(expense);
      setTotalBudget(budget);

      setTotalBalance(income - expense);
    } catch (error) {
      console.log(error);
    }
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return "";

    return timestamp.toDate().toLocaleDateString();
  };

  return (
    <div className="dashboard">
      <Sidebar />

      <div className="content">
        <h1>Welcome Back 👋</h1>

        {/* Cards */}

        <div className="card-container">
          <div className="card">
            <h3>Total Balance</h3>
            <h2>₹{totalBalance}</h2>
          </div>

          <div className="card">
            <h3>Total Income</h3>
            <h2>₹{totalIncome}</h2>
          </div>

          <div className="card">
            <h3>Total Expense</h3>
            <h2>₹{totalExpense}</h2>
          </div>

          <div className="card">
            <h3>Total Budget</h3>
            <h2>₹{totalBudget}</h2>
          </div>
        </div>

        {/* Buttons */}

        <div className="feature-container">
          <Link to="/income">
            <button className="feature-btn">
              💵 Income
            </button>
          </Link>

          <Link to="/expense">
            <button className="feature-btn">
              💸 Expense
            </button>
          </Link>

          <Link to="/budget">
            <button className="feature-btn">
              📊 Budget
            </button>
          </Link>

          <Link to="/charts">
            <button className="feature-btn">
              📈 Charts
            </button>
          </Link>

          <Link to="/reports">
            <button className="feature-btn">
              📈 Reports
            </button>
          </Link>

          <Link to="/advisor">
            <button className="feature-btn">
              🤖 AI Advisor
            </button>
          </Link>
        </div>

        {/* Income History */}

        <h2>💵 Income History</h2>

        {incomeData.map((item) => (
          <div className="history-card" key={item.id}>
            <p>{item.incomeName}</p>
            <p>₹{item.amount}</p>
            <p>{formatDate(item.createdAt)}</p>
          </div>
        ))}

        {/* Expense History */}

        <h2>💸 Expense History</h2>

        {expenseData.map((item) => (
          <div className="history-card" key={item.id}>
            <p>{item.expenseName}</p>
            <p>₹{item.amount}</p>
            <p>{formatDate(item.createdAt)}</p>
          </div>
        ))}

        {/* Savings History */}

        <h2>💰 Savings History</h2>

        {savingsData.map((item) => (
          <div className="history-card" key={item.id}>
            <p>{item.goal}</p>
            <p>₹{item.amount}</p>
            <p>{formatDate(item.createdAt)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;