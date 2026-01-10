import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const API = "http://localhost:8081/aii/users";

export default function ChangePasswordForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  async function handleChangePassword(e) {
    e.preventDefault();
    const url = `${API}/passwordChange/${email}/${oldPassword}/${newPassword}`;
    const res = await fetch(url, { method: "PUT" });
    if (res.ok) {
      setMessage("Password changed successfully.");
    } else {
      const errorResponse = await res.json();
      const errorText = errorResponse.error || "An unknown error occurred";

        if (res.status === 401) {
          setMessage("❌ Unauthorized (401) - Check CORS or credentials.");
        } else {
          setMessage("❌ " + errorText);
        }
    }
  }

  return (
    <div className="page-container">
      <h2>Change Password</h2>
      <form onSubmit={handleChangePassword}>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required /><br/>
        <input type="password" value={oldPassword} onChange={e => setOldPassword(e.target.value)} placeholder="Current Password" required /><br/>
        <input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} placeholder="New Password" required /><br/>
        <button type="submit">Update Password</button>
      </form>
      <p>{message}</p>
      <button onClick={() => navigate("/user-home")}>← Back</button>
    </div>
  );
}
