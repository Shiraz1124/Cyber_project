
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const API = "http://localhost:8081/aii/users";

// export default function RegisterForm() {
//   const navigate = useNavigate();
//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [role, setRole] = useState("END_USER");
//   const [message, setMessage] = useState("");

//   async function handleRegister(e) {
//     e.preventDefault();
//     setMessage("");

//     try {
//       const res = await fetch(`${API}/newUserRegister`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           username,
//           email,
//           password,
//           role
//         }),
//       });

//       if (!res.ok) {
//         const errorJson = await res.json();
//         const errorText = errorJson.error || "An unknown error occurred";

//         if (errorText.includes("already exists")) {
//           setMessage("❌ A user with this email already exists.");
//         } else {
//           setMessage("❌ " + errorText);
//         }
//         return;
//       }

//       const result = await res.json();
//       localStorage.setItem("userName", result.username);
//       localStorage.setItem("userRole", result.role);
//       alert(`Welcome ${result.username}`);
//       navigate("/user-home");
//     } catch (err) {
//       setMessage("❌ Network error.");
//     }
//   }

//   return (
//     <div className="page-container">
//       <h2>Register</h2>

//       {message && <p style={{ color: "red", fontWeight: "bold" }}>{message}</p>}

//       <form onSubmit={handleRegister}>
//         <input
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           placeholder="Username"
//           required
//           style={{ marginBottom: "10px", padding: "8px", width: "100%" }}
//         /><br />

//         <input
//           type="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           placeholder="Email"
//           required
//           style={{ marginBottom: "10px", padding: "8px", width: "100%" }}
//         /><br />

//         <input
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           placeholder="Password"
//           required
//           style={{ marginBottom: "10px", padding: "8px", width: "100%" }}
//         /><br />

//         <label htmlFor="role">Choose Role:</label><br />
//         <select
//           id="role"
//           value={role}
//           onChange={(e) => setRole(e.target.value)}
//           style={{ marginBottom: "15px", padding: "8px", width: "100%" }}
//         >
//           <option value="END_USER">End User</option>
//           <option value="ADMIN">Admin</option>
//         </select><br />

//         <button type="submit" style={{ padding: "10px 20px", marginBottom: "10px" }}>
//           Register
//         </button>
//       </form>

//       <button onClick={() => navigate("/")} style={{ padding: "10px 20px" }}>
//         ← Back
//       </button>
//     </div>
//   );
// }


// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const API = "http://localhost:8081/aii/users";
// const SQLI_API = "http://localhost:8081/aii/sqli";

// export default function RegisterForm() {
//   const navigate = useNavigate();
//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [role, setRole] = useState("END_USER");
//   const [message, setMessage] = useState("");
//   const [showPassword, setShowPassword] = useState(false);

//   async function handleRegister(e) {
//     e.preventDefault();
//     setMessage("");

//     try {
//       const res = await fetch(`${API}/newUserRegister`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           username,
//           email,
//           password,
//           role
//         }),
//       });

//       if (!res.ok) {
//         const errorJson = await res.json();
//         const errorText = errorJson.error || "An unknown error occurred";

//         if (errorText.includes("already exists")) {
//           setMessage("❌ A user with this email already exists.");
//         } else {
//           setMessage("❌ " + errorText);
//         }
//         return;
//       }

//       const result = await res.json();
//       localStorage.setItem("userName", result.username);
//       localStorage.setItem("userRole", result.role);
//       localStorage.setItem("userEmail", result.email);
//       alert(`Welcome ${result.username}`);
//       navigate("/user-home");
//     } catch (err) {
//       setMessage("❌ Network error.");
//     }
//   }

//   // SQL Injection vulnerable registration function
//   async function handleVulnerableRegister(e) {
//     e.preventDefault();
//     setMessage("");

//     try {
//       const res = await fetch(`${SQLI_API}/vulnerable-register`, {
//         method: "POST",
//         headers: { 
//           "Content-Type": "application/json",
//           "Accept": "application/json"
//         },
//         body: JSON.stringify({ 
//           email: email, 
//           password: password 
//         }),
//       });

//       console.log("Vulnerable register response status:", res.status);

//       if (!res.ok) {
//         let errorText;
//         try {
//           const errorResponse = await res.json();
//           errorText = errorResponse.error || `HTTP ${res.status}: ${res.statusText}`;
//         } catch (jsonError) {
//           // If response is not JSON, get text
//           const textResponse = await res.text();
//           errorText = `Server response: ${res.status} - ${textResponse}`;
//           console.log("Non-JSON response:", textResponse);
//         }
//         setMessage("❌ " + errorText);
//         return;
//       }

//       const result = await res.text(); // Expecting simple string response
//       console.log("Vulnerable register successful:", result);
      
//       // Show the result of the SQL injection
//       alert(`SQL Injection Result: ${result}`);
//       setMessage(`✅ ${result}`);

//     } catch (err) {
//       console.error("Vulnerable register error:", err);
//       setMessage("❌ Network error or server issue: " + err.message);
//     }
//   }

//   // Function to demonstrate SQL injection payload for registration
//   function fillSQLInjectionExample() {
//     setEmail("test@example.com");
//     setPassword("abc'); DROP TABLE users; --");
//   }



//   return (
//     <div className="page-container">
//       <h2>Register</h2>

//       {message && <p style={{ color: message.includes("✅") ? "green" : "red", fontWeight: "bold" }}>{message}</p>}

//       <form onSubmit={handleRegister}>
//         <input
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           placeholder="Username"
//           required
//           style={{ marginBottom: "10px", padding: "8px", width: "100%", boxSizing: "border-box" }}
//         /><br />

//         <input
//           type="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           placeholder="Email"
//           required
//           style={{ marginBottom: "10px", padding: "8px", width: "100%", boxSizing: "border-box" }}
//         /><br />

//         <div style={{ position: "relative", marginBottom: "10px" }}>
//           <input
//             type={showPassword ? "text" : "password"}
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             placeholder="Password"
//             required
//             style={{ 
//               width: "100%", 
//               padding: "8px", 
//               paddingRight: "40px",
//               boxSizing: "border-box"
//             }}
//           />
//           <button
//             type="button"
//             onClick={() => setShowPassword(!showPassword)}
//             style={{
//               position: "absolute",
//               right: "10px",
//               top: "50%",
//               transform: "translateY(-50%)",
//               background: "none",
//               border: "none",
//               cursor: "pointer",
//               fontSize: "18px",
//               padding: "0",
//               color: "#999",
//               height: "20px",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               transition: "color 0.2s ease"
//             }}
//             onMouseEnter={(e) => e.target.style.color = "#666"}
//             onMouseLeave={(e) => e.target.style.color = "#999"}
//           >
//             {showPassword ? "○" : "●"}
//           </button>
//         </div>

//         <label htmlFor="role">Choose Role:</label><br />
//         <select
//           id="role"
//           value={role}
//           onChange={(e) => setRole(e.target.value)}
//           style={{ marginBottom: "15px", padding: "8px", width: "100%", boxSizing: "border-box" }}
//         >
//           <option value="END_USER">End User</option>
//           <option value="ADMIN">Admin</option>
//         </select><br />

//         <div style={{ marginTop: "15px", marginBottom: "15px" }}>
//           <button type="submit" style={{ marginRight: "10px", padding: "10px 20px" }}>
//             🔐 Secure Register
//           </button>
          
//           <button 
//             type="button" 
//             onClick={handleVulnerableRegister}
//             style={{ 
//               marginRight: "10px", 
//               backgroundColor: "#ff4444", 
//               color: "white",
//               padding: "10px 15px",
//               border: "none",
//               borderRadius: "4px",
//               cursor: "pointer"
//             }}
//           >
//             ⚠️ Register with SQL Injection
//           </button>
//         </div>
//       </form>

//       {/* SQL Injection Demo Helper */}
//       <div style={{ 
//         backgroundColor: "#fff3cd", 
//         border: "1px solid #ffeaa7", 
//         padding: "15px", 
//         borderRadius: "5px",
//         marginTop: "20px"
//       }}>
//         <button 
//           onClick={fillSQLInjectionExample}
//           style={{ 
//             backgroundColor: "#ffeaa7", 
//             border: "1px solid #fdcb6e",
//             padding: "8px 12px",
//             borderRadius: "3px",
//             cursor: "pointer",
//             marginBottom: "10px"
//           }}
//         >
//           💥 DROP TABLE Example
//         </button>

//         <div style={{ fontSize: "12px", color: "#856404" }}>
//           <strong>Example 1 - Table Drop:</strong><br/>
//           <strong>Email:</strong> test@example.com<br/>
//           <strong>Password:</strong> abc'); DROP TABLE users; --<br/>
//           <small>This will attempt to drop the users table after inserting data</small>
//         </div>
//       </div>

//       <button onClick={() => navigate("/")} style={{ padding: "10px 20px", marginTop: "15px" }}>
//         ← Back
//       </button>
//     </div>
//   );
// }



import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const API = "http://localhost:8081/aii/users";
const SQLI_API = "http://localhost:8081/aii/sqli";

export default function RegisterForm() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("END_USER");
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  async function handleRegister(e) {
    e.preventDefault();
    setMessage("");

    try {
      const res = await fetch(`${API}/newUserRegister`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          email,
          password,
          role
        }),
      });

      if (!res.ok) {
        const errorJson = await res.json();
        const errorText = errorJson.error || "An unknown error occurred";

        if (errorText.includes("already exists")) {
          setMessage("❌ A user with this email already exists.");
        } else {
          setMessage("❌ " + errorText);
        }
        return;
      }

      const result = await res.json();
      localStorage.setItem("userName", result.username);
      localStorage.setItem("userRole", result.role);
      localStorage.setItem("userEmail", email); // Use form email instead of result.email
      //alert(`Welcome ${result.username}`);
      navigate("/user-home");
    } catch (err) {
      setMessage("❌ Network error.");
    }
  }

  // SQL Injection vulnerable registration function
  async function handleVulnerableRegister(e) {
    e.preventDefault();
    setMessage("");

    try {
      const res = await fetch(`${SQLI_API}/vulnerable-register`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({ 
          email: email, 
          password: password 
        }),
      });

      console.log("Vulnerable register response status:", res.status);

      if (!res.ok) {
        let errorText;
        try {
          const errorResponse = await res.json();
          errorText = errorResponse.error || `HTTP ${res.status}: ${res.statusText}`;
        } catch (jsonError) {
          // If response is not JSON, get text
          const textResponse = await res.text();
          errorText = `Server response: ${res.status} - ${textResponse}`;
          console.log("Non-JSON response:", textResponse);
        }
        setMessage("❌ " + errorText);
        return;
      }

      const result = await res.text(); // Expecting simple string response
      console.log("Vulnerable register successful:", result);
      
      // Store user data in localStorage for the vulnerable demo
      localStorage.setItem("userName", username || "VulnerableUser");
      localStorage.setItem("userRole", role);
      localStorage.setItem("userEmail", email);
      
      // Show the result of the SQL injection
      alert(`SQL Injection Result: ${result}`);
      setMessage(`✅ ${result}`);
      
      // Navigate to user home after vulnerable registration
      navigate("/user-home");

    } catch (err) {
      console.error("Vulnerable register error:", err);
      setMessage("❌ Network error or server issue: " + err.message);
    }
  }

  // Function to demonstrate SQL injection payload for registration
  function fillSQLInjectionExample() {
    setEmail("test@example.com");
    setPassword("abc'); DROP TABLE users; --");
  }

  return (
    <div className="page-container">
      <h2>Register</h2>

      {message && <p style={{ color: message.includes("✅") ? "green" : "red", fontWeight: "bold" }}>{message}</p>}

      <form onSubmit={handleRegister}>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
          style={{ marginBottom: "10px", padding: "8px", width: "100%", boxSizing: "border-box" }}
        /><br />

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          style={{ marginBottom: "10px", padding: "8px", width: "100%", boxSizing: "border-box" }}
        /><br />

        <div style={{ position: "relative", marginBottom: "10px" }}>
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            style={{ 
              width: "100%", 
              padding: "8px", 
              paddingRight: "40px",
              boxSizing: "border-box"
            }}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            style={{
              position: "absolute",
              right: "10px",
              top: "50%",
              transform: "translateY(-50%)",
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: "18px",
              padding: "0",
              color: "#999",
              height: "20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "color 0.2s ease"
            }}
            onMouseEnter={(e) => e.target.style.color = "#666"}
            onMouseLeave={(e) => e.target.style.color = "#999"}
          >
            {showPassword ? "○" : "●"}
          </button>
        </div>

        <label htmlFor="role">Choose Role:</label><br />
        <select
          id="role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          style={{ marginBottom: "15px", padding: "8px", width: "100%", boxSizing: "border-box" }}
        >
          <option value="END_USER">End User</option>
          <option value="ADMIN">Admin</option>
        </select><br />

        <div style={{ marginTop: "15px", marginBottom: "15px" }}>
          <button type="submit" style={{ marginRight: "10px", padding: "10px 20px" }}>
            Register with XSS
          </button>
          
          <button 
            type="button" 
            onClick={handleVulnerableRegister}
            style={{ 
              marginRight: "10px", 
              backgroundColor: "#ff4444", 
              color: "white",
              padding: "10px 15px",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer"
            }}
          >
            ⚠️ Register with SQL Injection
          </button>
        </div>
      </form>

      {/* SQL Injection Demo Helper */}
      <div style={{ 
        backgroundColor: "#fff3cd", 
        border: "1px solid #ffeaa7", 
        padding: "15px", 
        borderRadius: "5px",
        marginTop: "20px"
      }}>
        <button 
          onClick={fillSQLInjectionExample}
          style={{ 
            backgroundColor: "#ffeaa7", 
            border: "1px solid #fdcb6e",
            padding: "8px 12px",
            borderRadius: "3px",
            cursor: "pointer",
            marginBottom: "10px"
          }}
        >
          💥 DROP TABLE Example
        </button>

        <div style={{ fontSize: "12px", color: "#856404" }}>
          <strong>Example 1 - Table Drop:</strong><br/>
          <strong>Email:</strong> test@example.com<br/>
          <strong>Password:</strong> abc'); DROP TABLE users; --<br/>
          <small>This will attempt to drop the users table after inserting data</small>
        </div>
      </div>

      <button onClick={() => navigate("/")} style={{ padding: "10px 20px", marginTop: "15px" }}>
        ← Back
      </button>
    </div>
  );
}