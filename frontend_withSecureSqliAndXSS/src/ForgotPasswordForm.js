import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const API = "http://localhost:8081/aii/users";

export default function ForgotPasswordForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  async function handleForgotPassword(e) {
    e.preventDefault();
    await fetch(`${API}/forgot-password/${email}`, { method: "POST" });
    alert("Reset token sent (check backend logs)");
    navigate("/reset");
  }

  return (
    <div className="page-container">
      <h2>Forgot Password</h2>
      <form onSubmit={handleForgotPassword}>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required /><br/>
        <button type="submit">Send Reset Token</button>
      </form>
      <button onClick={() => navigate("/")}>← Back</button>
    </div>
  );
}
