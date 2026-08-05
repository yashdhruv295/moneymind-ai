import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Charts from "./pages/Charts";
import Income from "./pages/Income";
import Expense from "./pages/Expense";
import Budget from "./pages/Budget";
import Reports from "./pages/Reports";
import AIAdvisor from "./pages/AIAdvisor";
import Settings from "./pages/Settings";
import Savings from "./pages/Savings";
import Profile from "./pages/Profile";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={darkMode ? "dark" : "light"}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />

          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

          <Route
            path="/charts"
            element={<Charts />}
          />

          <Route
            path="/income"
            element={<Income />}
          />

          <Route
            path="/expense"
            element={<Expense />}
          />

          <Route
            path="/budget"
            element={<Budget />}
          />

          <Route
            path="/reports"
            element={<Reports />}
          />

          <Route
            path="/advisor"
            element={<AIAdvisor />}
          />

          <Route
            path="/settings"
            element={<Settings />}
          />

          <Route
             path="/savings"
              element={<Savings />}
           />

           <Route
            path="/profile"
            element={<Profile />}
           />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;