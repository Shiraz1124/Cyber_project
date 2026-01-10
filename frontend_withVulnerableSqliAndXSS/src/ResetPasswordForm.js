import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const API = "http://localhost:8081/aii/users";

export default function ResetPasswordForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  async function handleResetPassword(e) {
    e.preventDefault();

    try {
      const res = await fetch(
        `${API}/reset-password?email=${encodeURIComponent(email)}&resetCode=${encodeURIComponent(token)}&newPassword=${encodeURIComponent(newPassword)}`,
        { method: "PUT" }
      );

      if (res.ok) {
        setMessage("✅ Password reset successful!");
      } else {
        const errorText = await res.text();
        setMessage("❌ " + errorText);
      }
    } catch (err) {
      setMessage("❌ An error occurred: " + err.message);
    }
  }

  return (
    <div className="page-container">
      <h2>Reset Password</h2>
      <form onSubmit={handleResetPassword}>
        <input
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Email"
          required
        /><br />
        <input
          value={token}
          onChange={e => setToken(e.target.value)}
          placeholder="Reset Token"
          required
        /><br />
        <input
          type="password"
          value={newPassword}
          onChange={e => setNewPassword(e.target.value)}
          placeholder="New Password"
          required
        /><br />
        <button type="submit">Reset Password</button>
      </form>
      <p>{message}</p>
      <button onClick={() => navigate("/")}>← Back</button>
    </div>
  );
}
