import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useState } from "react";

import "./Sidebar.css";

function Sidebar() {
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);

      alert("Logout successful!");

      navigate("/");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="sidebar">
      <h2 className="logo">💰 MoneyMind AI</h2>

      <button
        className="menu-btn"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        ☰
      </button>

      <input
        type="text"
        placeholder="Search..."
        className="search-box"
      />

      <ul className={menuOpen ? "menu active" : "menu"}>
        <li>
          <Link to="/dashboard">🏠 Dashboard</Link>
        </li>

        <li>
          <Link to="/income">💵 Income</Link>
        </li>

        <li>
          <Link to="/expense">💳 Expense</Link>
        </li>

        <li>
          <Link to="/budget">💰 Budget</Link>
        </li>

        <li>
          <Link to="/charts">📈 Charts</Link>
        </li>

        <li>
          <Link to="/reports">📊 Reports</Link>
        </li>

        <li>
          <Link to="/advisor">🤖 AI Advisor</Link>
        </li>

        <li>
          <Link to="/settings">⚙️ Settings</Link>
        </li>

        <li>
          <Link to="/savings">💰 Savings</Link>
        </li>

        <li>
          <Link to="/profile">👤 Profile</Link>
        </li>

        <li>
          <button
            className="logout-btn"
            onClick={handleLogout}
          >
            🚪 Logout
          </button>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;