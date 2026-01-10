// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// export default function GetSpecificUser() {
//   const navigate = useNavigate();
//   const [adminEmail, setAdminEmail] = useState(localStorage.getItem("userEmail") || "");
//   const [clientEmail, setClientEmail] = useState("");
//   const [userData, setUserData] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleGetUser = async (e) => {
//     e.preventDefault();
    
//     if (!clientEmail.trim()) {
//       setError("Client email is required");
//       return;
//     }

//     setLoading(true);
//     setError("");
//     setUserData(null);

//     try {
//       const params = new URLSearchParams({
//         adminEmail: adminEmail.trim(),
//         clientEmail: clientEmail.trim()
//       });

//       const response = await fetch(`http://localhost:8081/aii/admin/getSpecificUser?${params}`, {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//           // Add any authentication headers if needed
//           // 'Authorization': `Bearer ${localStorage.getItem('token')}`
//         }
//       });

//       if (!response.ok) {
//         throw new Error(`Error: ${response.status} - ${response.statusText}`);
//       }

//       const data = await response.json();
      
//       if (data) {
//         setUserData(data);
//       } else {
//         setError("No user found with the provided email");
//       }
//     } catch (err) {
//       setError(err.message || "Failed to fetch user data");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleClear = () => {
//     setClientEmail("");
//     setUserData(null);
//     setError("");
//   };

//   return (
//     <div className="page-container" style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
//       <div style={{ marginBottom: "20px" }}>
//         <button 
//           onClick={() => navigate(-1)} 
//           style={{ 
//             padding: "8px 16px", 
//             backgroundColor: "#6c757d", 
//             color: "white", 
//             border: "none", 
//             borderRadius: "4px",
//             cursor: "pointer"
//           }}
//         >
//           ← Back
//         </button>
//       </div>

//       <h2>🔍 View Specific User</h2>
      
//       <form onSubmit={handleGetUser} style={{ marginBottom: "30px" }}>
//         <div style={{ marginBottom: "20px" }}>
//           <label htmlFor="clientEmail" style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
//             Client Email:
//           </label>
//           <input
//             type="email"
//             id="clientEmail"
//             value={clientEmail}
//             onChange={(e) => setClientEmail(e.target.value)}
//             placeholder="Enter client email to search"
//             style={{
//               width: "100%",
//               padding: "10px",
//               border: "1px solid #ddd",
//               borderRadius: "4px",
//               fontSize: "16px"
//             }}
//             required
//           />
//         </div>

//         <div style={{ display: "flex", gap: "10px" }}>
//           <button
//             type="submit"
//             disabled={loading}
//             style={{
//               padding: "12px 24px",
//               backgroundColor: loading ? "#6c757d" : "#007bff",
//               color: "white",
//               border: "none",
//               borderRadius: "4px",
//               cursor: loading ? "not-allowed" : "pointer",
//               fontSize: "16px"
//             }}
//           >
//             {loading ? "Searching..." : "🔍 Get User"}
//           </button>
          
//           <button
//             type="button"
//             onClick={handleClear}
//             style={{
//               padding: "12px 24px",
//               backgroundColor: "#6c757d",
//               color: "white",
//               border: "none",
//               borderRadius: "4px",
//               cursor: "pointer",
//               fontSize: "16px"
//             }}
//           >
//             🗑️ Clear
//           </button>
//         </div>
//       </form>

//       {error && (
//         <div style={{
//           padding: "15px",
//           backgroundColor: "#f8d7da",
//           color: "#721c24",
//           border: "1px solid #f5c6cb",
//           borderRadius: "4px",
//           marginBottom: "20px"
//         }}>
//           <strong>Error:</strong> {error}
//         </div>
//       )}

//       {userData && (
//         <div style={{
//           border: "1px solid #ddd",
//           borderRadius: "8px",
//           padding: "20px",
//           backgroundColor: "#f8f9fa"
//         }}>
//           <h3 style={{ marginTop: 0, marginBottom: "20px", color: "#28a745" }}>
//             ✅ User Found
//           </h3>
          
//           <div style={{ display: "grid", gap: "15px" }}>
//             {Object.entries(userData).map(([key, value]) => (
//               <div key={key} style={{ 
//                 display: "flex", 
//                 borderBottom: "1px solid #dee2e6", 
//                 paddingBottom: "8px" 
//               }}>
//                 <span style={{ 
//                   fontWeight: "bold", 
//                   minWidth: "150px", 
//                   color: "#495057",
//                   textTransform: "capitalize"
//                 }}>
//                   {key.replace(/([A-Z])/g, ' $1').trim()}:
//                 </span>
//                 <span style={{ color: "#212529", wordBreak: "break-word" }}>
//                   {typeof value === 'object' && value !== null 
//                     ? JSON.stringify(value, null, 2) 
//                     : String(value || 'N/A')}
//                 </span>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}

//       {userData === null && !loading && !error && (
//         <div style={{
//           padding: "20px",
//           textAlign: "center",
//           color: "#6c757d",
//           fontStyle: "italic"
//         }}>
//           Enter client email above to search for a specific user
//         </div>
//       )}
//     </div>
//   );
// }





import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function GetSpecificUser() {
  const navigate = useNavigate();
  const [adminEmail, setAdminEmail] = useState(localStorage.getItem("userEmail") || "");
  const [clientEmail, setClientEmail] = useState("");
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGetUser = async (e) => {
    e.preventDefault();
    
    if (!clientEmail.trim()) {
      setError("Client email is required");
      return;
    }

    setLoading(true);
    setError("");
    setUserData(null);

    try {
      const params = new URLSearchParams({
        adminEmail: adminEmail.trim(),
        clientEmail: clientEmail.trim()
      });

      const response = await fetch(`http://localhost:8081/aii/admin/getSpecificUser?${params}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // Add any authentication headers if needed
          // 'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.ok) {
        // Handle specific HTTP status codes
        if (response.status === 404) {
          setError(`❌ User with email "${clientEmail.trim()}" does not exist or was not found`);
        } else if (response.status === 403) {
          setError("❌ Access denied. You don't have permission to view this user");
        } else if (response.status === 401) {
          setError("❌ Authentication failed. Please log in again");
        } else {
          setError(`❌ Server error: ${response.status} - ${response.statusText}`);
        }
        return;
      }

      const data = await response.json();
      
      if (data) {
        setUserData(data);
      } else {
        setError(`❌ User with email "${clientEmail.trim()}" does not exist or was not found`);
      }
    } catch (err) {
      setError(`❌ ${err.message || "Failed to fetch user data. Please check your connection and try again"}`);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setClientEmail("");
    setUserData(null);
    setError("");
  };

  return (
    <div className="page-container" style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <div style={{ marginBottom: "20px" }}>
        <button 
          onClick={() => navigate(-1)} 
          style={{ 
            padding: "8px 16px", 
            backgroundColor: "#6c757d", 
            color: "white", 
            border: "none", 
            borderRadius: "4px",
            cursor: "pointer"
          }}
        >
          ← Back
        </button>
      </div>

      <h2>🔍 View Specific User</h2>
      
      <form onSubmit={handleGetUser} style={{ marginBottom: "30px" }}>
        <div style={{ marginBottom: "20px" }}>
          <label htmlFor="clientEmail" style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
            Client Email:
          </label>
          <input
            type="email"
            id="clientEmail"
            value={clientEmail}
            onChange={(e) => setClientEmail(e.target.value)}
            placeholder="Enter client email to search"
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #ddd",
              borderRadius: "4px",
              fontSize: "16px"
            }}
            required
          />
        </div>

        <div style={{ display: "flex", gap: "10px" }}>
          <button
            type="submit"
            disabled={loading}
            style={{
              padding: "12px 24px",
              backgroundColor: loading ? "#6c757d" : "#007bff",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: loading ? "not-allowed" : "pointer",
              fontSize: "16px"
            }}
          >
            {loading ? "Searching..." : "🔍 Get User"}
          </button>
          
          <button
            type="button"
            onClick={handleClear}
            style={{
              padding: "12px 24px",
              backgroundColor: "#6c757d",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "16px"
            }}
          >
            🗑️ Clear
          </button>
        </div>
      </form>

      {error && (
        <div style={{
          padding: "15px",
          backgroundColor: "#f8d7da",
          color: "#721c24",
          border: "1px solid #f5c6cb",
          borderRadius: "4px",
          marginBottom: "20px"
        }}>
          <strong>{error}</strong>
        </div>
      )}

      {userData && (
        <div style={{
          border: "1px solid #ddd",
          borderRadius: "8px",
          padding: "20px",
          backgroundColor: "#f8f9fa"
        }}>
          <h3 style={{ marginTop: 0, marginBottom: "20px", color: "#28a745" }}>
            ✅ User Found
          </h3>
          
          <div style={{ display: "grid", gap: "15px" }}>
            {Object.entries(userData).map(([key, value]) => (
              <div key={key} style={{ 
                display: "flex", 
                borderBottom: "1px solid #dee2e6", 
                paddingBottom: "8px" 
              }}>
                <span style={{ 
                  fontWeight: "bold", 
                  minWidth: "150px", 
                  color: "#495057",
                  textTransform: "capitalize"
                }}>
                  {key.replace(/([A-Z])/g, ' $1').trim()}:
                </span>
                <span style={{ color: "#212529", wordBreak: "break-word" }}>
                  {typeof value === 'object' && value !== null 
                    ? JSON.stringify(value, null, 2) 
                    : String(value || 'N/A')}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {userData === null && !loading && !error && (
        <div style={{
          padding: "20px",
          textAlign: "center",
          color: "#6c757d",
          fontStyle: "italic"
        }}>
          Enter client email above to search for a specific user
        </div>
      )}
    </div>
  );
}