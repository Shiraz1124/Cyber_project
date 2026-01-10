// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// const API = "http://localhost:8081/aii/admin/getAllUsers";

// export default function AllUsersScreen() {
//   const [users, setUsers] = useState([]);
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const userRole = localStorage.getItem("userRole");
//   const adminEmail = localStorage.getItem("userEmail"); // Must be stored at login

//   useEffect(() => {
//     if (userRole !== "ADMIN") {
//       setError("Access Denied: You are not an admin.");
//       return;
//     }

//     fetch(`${API}?adminEmail=${encodeURIComponent(adminEmail)}`)
//       .then((res) => {
//         if (!res.ok) throw new Error("Failed to fetch users");
//         return res.json();
//       })
//       .then((data) => {
//         setUsers(data);
//       })
//       .catch((err) => {
//         console.error(err);
//         setError("Failed to fetch users");
//       });
//   }, [adminEmail, userRole]);

//   if (error) {
//     return (
//       <div className="page-container">
//         <h2>⚠️ {error}</h2>
//         <button onClick={() => navigate("/")}>← Back</button>
//       </div>
//     );
//   }

//   return (
//     <div className="page-container">
//       <h2>👥 All Registered Users</h2>

//       {users.length === 0 ? (
//         <p>No users found.</p>
//       ) : (
//         <table border="1" cellPadding="10" style={{ width: "100%", textAlign: "left" }}>
//           <thead>
//             <tr>
//               <th>Email</th>
//               <th>Username</th>
//               <th>Role</th>
//             </tr>
//           </thead>
//           <tbody>
//             {users.map((user, idx) => (
//               <tr key={idx}>
//                 <td>{user.userId?.email}</td>
//                 <td>{user.username}</td>
//                 <td>{user.role}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}

//       <button
//         onClick={() => {
//           navigate("/user-home");
//           window.location.reload(); // ✅ forces re-check of role and proper admin UI
//         }}
//         style={{ marginTop: "20px" }}
//       >
//         ← Back
//       </button>
//     </div>
//   );
// }


import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API = "http://localhost:8081/aii/admin/getAllUsers";

export default function AllUsersScreen() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const userRole = localStorage.getItem("userRole");
  const adminEmail = localStorage.getItem("userEmail") || localStorage.getItem("userName"); // Fallback to userName

  useEffect(() => {
    // Check admin access first
    if (userRole !== "ADMIN") {
      setError("Access Denied: You are not an admin.");
      setLoading(false);
      return;
    }

    // Check if admin email exists
    if (!adminEmail) {
      setError("Admin email not found. Please log out and log in again to refresh your session.");
      setLoading(false);
      return;
    }

    // Add a small delay to ensure everything is properly loaded
    const fetchUsers = async () => {
      try {
        setLoading(true);
        console.log("Fetching users for admin:", adminEmail);
        console.log("Full API URL:", `${API}?adminEmail=${encodeURIComponent(adminEmail)}`);
        
        const response = await fetch(`${API}?adminEmail=${encodeURIComponent(adminEmail)}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        });
        
        console.log("Response status:", response.status);
        console.log("Response headers:", response.headers);
        
        if (!response.ok) {
          // Try to get more detailed error info
          let errorMessage = `HTTP ${response.status}: ${response.statusText}`;
          try {
            const errorData = await response.text();
            if (errorData) {
              errorMessage += ` - ${errorData}`;
            }
          } catch (e) {
            console.log("Could not parse error response");
          }
          throw new Error(errorMessage);
        }
        
        const data = await response.json();
        console.log("Users fetched successfully:", data);
        setUsers(data);
        setError("");
      } catch (err) {
        console.error("Error fetching users:", err);
        
        // More specific error messages
        if (err.message.includes('404')) {
          setError(`API endpoint not found. Please check if the server is running and the endpoint /aii/admin/getAllUsers exists. Admin email: ${adminEmail}`);
        } else if (err.message.includes('Failed to fetch')) {
          setError(`Cannot connect to server. Please check if the backend is running on http://localhost:8081`);
        } else {
          setError(`Failed to fetch users: ${err.message}`);
        }
      } finally {
        setLoading(false);
      }
    };

    // Add a small delay to ensure localStorage is fully loaded
    const timeoutId = setTimeout(fetchUsers, 100);
    
    return () => clearTimeout(timeoutId);
  }, [adminEmail, userRole]);

  // Loading state
  if (loading) {
    return (
      <div className="page-container">
        <h2>👥 All Registered Users</h2>
        <div style={{ 
          textAlign: "center", 
          padding: "40px", 
          color: "#6c757d" 
        }}>
          <div style={{ 
            fontSize: "24px", 
            marginBottom: "10px" 
          }}>⏳</div>
          <p>Loading users...</p>
        </div>
        <button onClick={() => navigate("/user-home")}>
          ← Back
        </button>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="page-container">
        <h2>⚠️ Error</h2>
        <div style={{
          backgroundColor: "#f8d7da",
          border: "1px solid #f5c6cb",
          color: "#721c24",
          padding: "15px",
          borderRadius: "5px",
          marginBottom: "20px"
        }}>
          <strong>Error:</strong> {error}
        </div>
        
        <div style={{ marginBottom: "20px" }}>
          <button 
            onClick={() => {
              setError("");
              setLoading(true);
              // Force a complete reload to reset everything
              setTimeout(() => window.location.reload(), 100);
            }}
            style={{ 
              marginRight: "10px",
              backgroundColor: "#007bff",
              color: "white",
              padding: "8px 16px",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer"
            }}
          >
            🔄 Retry
          </button>
          
          <button 
            onClick={() => {
              // Try the original simple approach as fallback
              fetch(`${API}?adminEmail=${encodeURIComponent(adminEmail)}`)
                .then((res) => {
                  if (!res.ok) throw new Error("Failed to fetch users");
                  return res.json();
                })
                .then((data) => {
                  setUsers(data);
                  setError("");
                  setLoading(false);
                })
                .catch((err) => {
                  console.error(err);
                  setError(`Fallback also failed: ${err.message}. Please check your backend server.`);
                  setLoading(false);
                });
            }}
            style={{ 
              marginRight: "10px",
              backgroundColor: "#ffc107",
              color: "black",
              padding: "8px 16px",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer"
            }}
          >
            🔄 Try Simple Fetch
          </button>
          
          <button onClick={() => navigate("/user-home")}>
            ← Back
          </button>
        </div>
      </div>
    );
  }

  // Success state
  return (
    <div className="page-container">
      <h2>👥 All Registered Users</h2>
      
      <div style={{ 
        marginBottom: "20px", 
        padding: "10px", 
        backgroundColor: "#e7f3ff", 
        borderRadius: "5px",
        fontSize: "14px",
        color: "#0c5460"
      }}>
        <strong>Admin:</strong> {adminEmail} | <strong>Total Users:</strong> {users.length}
      </div>

      {users.length === 0 ? (
        <div style={{
          textAlign: "center",
          padding: "40px",
          backgroundColor: "#f8f9fa",
          borderRadius: "5px",
          color: "#6c757d"
        }}>
          <div style={{ fontSize: "48px", marginBottom: "10px" }}>👤</div>
          <p>No users found in the system.</p>
        </div>
      ) : (
        <div style={{ overflowX: "auto" }}>
          <table 
            border="1" 
            cellPadding="10" 
            style={{ 
              width: "100%", 
              textAlign: "left",
              borderCollapse: "collapse",
              backgroundColor: "white"
            }}
          >
            <thead style={{ backgroundColor: "#f8f9fa" }}>
              <tr>
                <th style={{ padding: "12px" }}>Email</th>
                <th style={{ padding: "12px" }}>Username</th>
                <th style={{ padding: "12px" }}>Role</th>
                <th style={{ padding: "12px" }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, idx) => (
                <tr key={idx} style={{ borderBottom: "1px solid #dee2e6" }}>
                  <td style={{ padding: "12px" }}>
                    {user.userId?.email || "N/A"}
                  </td>
                  <td style={{ padding: "12px" }}>
                    {user.username || "N/A"}
                  </td>
                  <td style={{ padding: "12px" }}>
                    <span style={{
                      padding: "4px 8px",
                      borderRadius: "12px",
                      fontSize: "12px",
                      fontWeight: "bold",
                      backgroundColor: user.role === "ADMIN" ? "#ff6b6b" : "#51cf66",
                      color: "white"
                    }}>
                      {user.role || "END_USER"}
                    </span>
                  </td>
                  <td style={{ padding: "12px" }}>
                    <span style={{ color: "#28a745" }}>● Active</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
        <button
          onClick={() => navigate("/user-home")}
          style={{ 
            padding: "10px 20px",
            backgroundColor: "#6c757d",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer"
          }}
        >
          ← Back to Admin Panel
        </button>
        
        <button
          onClick={() => {
            setLoading(true);
            window.location.reload();
          }}
          style={{ 
            padding: "10px 20px",
            backgroundColor: "#28a745",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer"
          }}
        >
          🔄 Refresh Users
        </button>
      </div>
    </div>
  );
}