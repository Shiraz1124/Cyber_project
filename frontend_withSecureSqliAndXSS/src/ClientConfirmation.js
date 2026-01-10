import React from "react";
import { useNavigate } from "react-router-dom";

export default function ClientConfirmation() {
  const navigate = useNavigate();
  const clientName = localStorage.getItem("newClientName");

  return (
    <div className="page-container">
      <h2>✅ New Client Added</h2>
      <p>
        <strong>{clientName}</strong> has been successfully registered to the system.
      </p>

      <button style={{ marginRight: "10px" }} onClick={() => navigate("/admin/create_endUser")}>
        🔁 Add Another User
      </button>

      <button onClick={() => navigate("/user-home")}>
        🔙 Back to Admin Panel
      </button>
    </div>
  );
}
