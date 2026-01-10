
import React from "react";
import { useNavigate } from "react-router-dom";

export default function UserHomepage() {
  const navigate = useNavigate();
  const userName = localStorage.getItem("userName") || "User";
  const userRole = localStorage.getItem("userRole");

  const internetPlans = [
    { id: 1, name: "Basic Plan - 50GB", price: "$8/month" },
    { id: 2, name: "Standard Plan - 100GB", price: "$13/month" },
    { id: 3, name: "Premium Plan - 300GB", price: "$21/month" },
    { id: 4, name: "Unlimited Plan", price: "$25/month" }
  ];

  return (
    <div className="page-container">
      {/*<h2>Hello, {userName} 👋</h2>*/}
      <h2 dangerouslySetInnerHTML={{ __html: `Hello, ${userName} 👋` }} />
      <h3>Internet Data Plans</h3>
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {internetPlans.map(plan => (
          <li key={plan.id} style={{ marginBottom: "15px" }}>
            <strong>{plan.name}</strong><br />
            {plan.price}
          </li>
        ))}
      </ul>

      <div style={{ marginTop: 20 }}>
        {userRole === "ADMIN" && (
          <>
            <button onClick={() => navigate("/admin/create_endUser")} style={{ marginRight: 10 }}>
              ➕ Create New User
            </button>
            <button onClick={() => navigate("/admin/getAllUsers")} style={{ marginRight: 10 }}>
              👥 View All Users
            </button>
            <button onClick={() => navigate("/admin/getSpecificUser")} style={{ marginRight: 10 }}>
              🔍 View Specific User
            </button>
          </>
        )}

        <button onClick={() => navigate("/change-password")} style={{ marginRight: 10 }}>
          🔑 Change Password
        </button>
        <button onClick={() => {
          localStorage.clear();
          navigate("/");
        }}>
          🚪 Sign Out
        </button>
      </div>
    </div>
  );
}