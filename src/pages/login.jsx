import "./Login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

import { auth } from "../firebase/firebase";
import { sendPasswordResetEmail } from "firebase/auth";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Register User
  const handleRegister = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);

      alert("Account created successfully!");

      navigate("/dashboard");
    } catch (error) {
      alert(error.message);
    }
  };

  // Email Login
  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);

      alert("Login successful!");

      navigate("/dashboard");
    } catch (error) {
      alert(error.message);
    }
  };

  // Google Login
  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();

      await signInWithPopup(auth, provider);

      alert("Google Login Successful!");

      navigate("/dashboard");
    } catch (error) {
      alert(error.message);
    }
  };

  const resetPassword = async () => {
  await sendPasswordResetEmail(auth, email);
  alert("Reset email sent.");
};

  return (
    <div className="login-container">

      <div className="left-section">
        <h1>💰 MoneyMind AI</h1>

        <p>
          Track your income, expenses, budgets, and get AI-powered
          financial advice.
        </p>

        <button
          className="google-btn"
          onClick={handleGoogleLogin}
        >
          Continue with Google
        </button>
      </div>

      <div className="right-section">
        <h2>Welcome Back</h2>

        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="login-btn"
          onClick={handleLogin}
        >
          Login
        </button>

        <button
          className="login-btn"
          onClick={handleRegister}
        >
          Register
        </button>

        <button onClick={resetPassword}>
            Forgot Password
        </button>
      </div>

    </div>
  );
}

export default Login;