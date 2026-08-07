import { HashRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Login from "./login";
import Dashboard from "./Dashboard";
import Charts from "./Charts";
import Income from "./Income";
import Expense from "./Expense";
import Budget from "./Budget";
import Reports from "./Reports";
import AIAdvisor from "./AIAdvisor";
import Settings from "./Settings";
import Savings from "./Savings";
import Profile from "./Profile";


function App() {

  const [darkMode, setDarkMode] = useState(false);

  return (

    <div className={darkMode ? "dark" : "light"}>

      <HashRouter>

        <Routes>

          {/* Login */}
          <Route 
            path="/" 
            element={<Login />} 
          />


          {/* Dashboard */}
          <Route
            path="/dashboard"
            element={<Dashboard />}
          />


          {/* Charts */}
          <Route
            path="/charts"
            element={<Charts />}
          />


          {/* Income */}
          <Route
            path="/income"
            element={<Income />}
          />


          {/* Expense */}
          <Route
            path="/expense"
            element={<Expense />}
          />


          {/* Budget */}
          <Route
            path="/budget"
            element={<Budget />}
          />


          {/* Reports */}
          <Route
            path="/reports"
            element={<Reports />}
          />


          {/* AI Advisor */}
          <Route
            path="/advisor"
            element={<AIAdvisor />}
          />


          {/* Settings */}
          <Route
            path="/settings"
            element={<Settings />}
          />


          {/* Savings */}
          <Route
            path="/savings"
            element={<Savings />}
          />


          {/* Profile */}
          <Route
            path="/profile"
            element={<Profile />}
          />


          {/* Invalid URL */}
          <Route
            path="*"
            element={<Login />}
          />

        </Routes>


      </HashRouter>

    </div>

  );
}


export default App;