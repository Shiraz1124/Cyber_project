// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const API = "http://localhost:8081/aii/users";

// export default function LoginScreen() {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [message, setMessage] = useState("");

//   async function handleLogin(e) {
//     e.preventDefault();
//     setMessage("");

//     try {
//       const res = await fetch(`${API}/login/${email}/${password}`);

//       if (!res.ok) {
//         const errorResponse = await res.json();
//         const errorText = errorResponse.error || "An unknown error occurred";

//         if (res.status === 401) {
//           setMessage("❌ Unauthorized (401) - Check CORS or credentials.");
//         } else {
//           setMessage("❌ " + errorText);
//         }

//         return;
//       }

//       const user = await res.json();
//       localStorage.setItem("userName", user.username || user.userId?.email);
//       alert(`Welcome ${user.username || user.userId?.email}`);
//       navigate("/user-home");

//     } catch (err) {
//       console.error("Login error:", err);
//       setMessage("❌ Server error. Please try again later.");
//     }
//   }

//   return (
//     <div className="page-container">
//       <h2>Sign In</h2>
//       <form onSubmit={handleLogin}>
//         <input
//           type="email"
//           value={email}
//           onChange={e => setEmail(e.target.value)}
//           placeholder="Email"
//           required
//         /><br/>
//         <input
//           type="password"
//           value={password}
//           onChange={e => setPassword(e.target.value)}
//           placeholder="Password"
//           required
//         /><br/>
//         <button type="submit">Sign In</button>
//       </form>

//       {message && (
//         <p style={{ color: "red", marginTop: "10px" }}>{message}</p>
//       )}

//       <button onClick={() => navigate("/")}>← Back</button>
//     </div>
//   );
// }






// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const API = "http://localhost:8081/aii/users";

// export default function LoginScreen() {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [message, setMessage] = useState("");

//   async function handleLogin(e) {
//     e.preventDefault();
//     setMessage("");

//     try {
//       const res = await fetch(`${API}/login/${email}/${password}`);

//       if (!res.ok) {
//         const errorResponse = await res.json();
//         const errorText = errorResponse.error || "An unknown error occurred";

//         if (res.status === 401) {
//           setMessage("❌ Unauthorized (401) - Check CORS or credentials.");
//         } else {
//           setMessage("❌ " + errorText);
//         }
//         return;
//       }

//       const user = await res.json();
//       localStorage.setItem("userName", user.username || user.userId?.email);
//       localStorage.setItem("userRole", user.role);
//       localStorage.setItem("userEmail", user.userId?.email);
//       alert(`Welcome ${user.username || user.userId?.email}`);
//       navigate("/user-home");

//     } catch (err) {
//       console.error("Login error:", err);
//       setMessage("❌ Server error. Please try again later.");
//     }
//   }

//   return (
//     <div className="page-container">
//       <h2>Sign In</h2>
//       <form onSubmit={handleLogin}>
//         <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required /><br/>
//         <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required /><br/>
//         <button type="submit">Sign In</button>
//       </form>
//       {message && <p style={{ color: "red", marginTop: "10px" }}>{message}</p>}
//       <button onClick={() => navigate("/")}>← Back</button>
//     </div>
//   );
// }


// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const API = "http://localhost:8081/aii/users";
// const SQLI_API = "http://localhost:8081/aii/sqli";

// export default function LoginScreen() {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [message, setMessage] = useState("");

//   async function handleLogin(e) {
//     e.preventDefault();
//     setMessage("");

//     try {
//       const res = await fetch(`${API}/login/${email}/${password}`);

//       if (!res.ok) {
//         const errorResponse = await res.json();
//         const errorText = errorResponse.error || "An unknown error occurred";

//         if (res.status === 401) {
//           setMessage("❌ Unauthorized (401) - Check CORS or credentials.");
//         } else {
//           setMessage("❌ " + errorText);
//         }
//         return;
//       }

//       const user = await res.json();
//       localStorage.setItem("userName", user.username || user.userId?.email);
//       localStorage.setItem("userRole", user.role);
//       localStorage.setItem("userEmail", user.userId?.email);
//       alert(`Welcome ${user.username || user.userId?.email}`);
//       navigate("/user-home");

//     } catch (err) {
//       console.error("Login error:", err);
//       setMessage("❌ Server error. Please try again later.");
//     }
//   }

//   // SQL Injection vulnerable login function
//   async function handleVulnerableLogin(e) {
//     e.preventDefault();
//     setMessage("");

//     try {
//       const res = await fetch(`${SQLI_API}/vulnerable-login`, {
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

//       console.log("Response status:", res.status);

//       if (!res.ok) {
//         let errorText;
//         try {
//           const errorResponse = await res.json();
//           errorText = errorResponse.error || `HTTP ${res.status}: ${res.statusText}`;
//         } catch (jsonError) {
//           // If response is not JSON, get text
//           const textResponse = await res.text();
//           errorText = `Server error: ${res.status} - ${textResponse}`;
//           console.log("Non-JSON response:", textResponse);
//         }
//         setMessage("❌ " + errorText);
//         return;
//       }

//       const user = await res.json();
//       console.log("Vulnerable login successful:", user);
      
//       localStorage.setItem("userName", user.username || "Hacked User");
//       localStorage.setItem("userRole", user.role || "ADMIN");
//       localStorage.setItem("userEmail", user.email || email);
//       alert(`SQL Injection Success! Welcome ${user.username || "Hacked User"}`);
//       navigate("/user-home");

//     } catch (err) {
//       console.error("Vulnerable login error:", err);
//       setMessage("❌ Network error or server issue: " + err.message);
//     }
//   }

//   // Function to demonstrate common SQL injection payloads
//   function fillSQLInjectionExample() {
//     setEmail("shiraz@gmail.com");
//     setPassword("' OR '1'='1");
//   }

//   return (
//     <div className="page-container">
//       <h2>Sign In</h2>
//       <form onSubmit={handleLogin}>
//         <input 
//           type="email" 
//           value={email} 
//           onChange={e => setEmail(e.target.value)} 
//           placeholder="Email" 
//           required 
//         /><br/>
//         <input 
//           type="password" 
//           value={password} 
//           onChange={e => setPassword(e.target.value)} 
//           placeholder="Password" 
//           required 
//         /><br/>
        
//         <div style={{ marginTop: "15px", marginBottom: "15px" }}>
//           <button type="submit" style={{ marginRight: "10px" }}>
//             🔐 Secure Login
//           </button>
          
//           <button 
//             type="button" 
//             onClick={handleVulnerableLogin}
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
//             ⚠️ Login with SQL Injection
//           </button>
          
//           <button 
//             type="button" 
//             onClick={() => {
//               console.log("Testing endpoint availability...");
//               fetch(`${SQLI_API}/vulnerable-login`, { method: "OPTIONS" })
//                 .then(res => console.log("OPTIONS response:", res.status))
//                 .catch(err => console.log("OPTIONS error:", err));
//             }}
//             style={{ 
//               backgroundColor: "#6c757d", 
//               color: "white",
//               padding: "8px 12px",
//               border: "none",
//               borderRadius: "4px",
//               cursor: "pointer",
//               fontSize: "12px"
//             }}
//           >
//             🔍 Test Endpoint
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
//         <h4>🎓 SQL Injection Demo</h4>
//         <p>For educational purposes, try this SQL injection payload:</p>
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
//           Fill SQL Injection Example
//         </button>
//         <div style={{ fontSize: "12px", color: "#856404" }}>
//           <strong>Email:</strong> shiraz@gmail.com<br/>
//           <strong>Password:</strong> ' OR '1'='1<br/>
//           <small>This will bypass the login check by making the SQL condition always true</small>
//         </div>
//       </div>

//       {message && <p style={{ color: "red", marginTop: "10px" }}>{message}</p>}
      
//       <button onClick={() => navigate("/")} style={{ marginTop: "10px" }}>
//         ← Back
//       </button>
//     </div>
//   );
// }





// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const API = "http://localhost:8081/aii/users";
// const SQLI_API = "http://localhost:8081/aii/sqli";

// export default function LoginScreen() {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [message, setMessage] = useState("");

//   async function handleLogin(e) {
//     e.preventDefault();
//     setMessage("");

//     try {
//       const res = await fetch(`${API}/login/${email}/${password}`);

//       if (!res.ok) {
//         const errorResponse = await res.json();
//         const errorText = errorResponse.error || "An unknown error occurred";

//         if (res.status === 401) {
//           setMessage("❌ Unauthorized (401) - Check CORS or credentials.");
//         } else {
//           setMessage("❌ " + errorText);
//         }
//         return;
//       }

//       const user = await res.json();
//       localStorage.setItem("userName", user.username || user.userId?.email);
//       localStorage.setItem("userRole", user.role);
//       localStorage.setItem("userEmail", user.userId?.email);
//       alert(`Welcome ${user.username || user.userId?.email}`);
//       navigate("/user-home");

//     } catch (err) {
//       console.error("Login error:", err);
//       setMessage("❌ Server error. Please try again later.");
//     }
//   }

//   // SQL Injection vulnerable login function
//   async function handleVulnerableLogin(e) {
//     e.preventDefault();
//     setMessage("");

//     try {
//       const res = await fetch(`${SQLI_API}/vulnerable-login`, {
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

//       console.log("Response status:", res.status);

//       if (!res.ok) {
//         let errorText;
//         try {
//           const errorResponse = await res.json();
//           errorText = errorResponse.error || `HTTP ${res.status}: ${res.statusText}`;
//         } catch (jsonError) {
//           // If response is not JSON, get text
//           const textResponse = await res.text();
//           errorText = `Server error: ${res.status} - ${textResponse}`;
//           console.log("Non-JSON response:", textResponse);
//         }
//         setMessage("❌ " + errorText);
//         return;
//       }

//       const user = await res.json();
//       console.log("Vulnerable login successful:", user);
      
//       localStorage.setItem("userName", user.username || "Hacked User");
//       localStorage.setItem("userRole", user.role || "ADMIN");
//       localStorage.setItem("userEmail", user.email || email);
//       alert(`SQL Injection Success! Welcome ${user.username || "Hacked User"}`);
//       navigate("/user-home");

//     } catch (err) {
//       console.error("Vulnerable login error:", err);
//       setMessage("❌ Network error or server issue: " + err.message);
//     }
//   }

//   // Function to demonstrate common SQL injection payloads
//   function fillSQLInjectionExample() {
//     setEmail("shiraz@gmail.com");
//     setPassword("' OR '1'='1");
//   }

//   return (
//     <div className="page-container">
//       <h2>Sign In</h2>
//       <form onSubmit={handleLogin}>
//         <input 
//           type="email" 
//           value={email} 
//           onChange={e => setEmail(e.target.value)} 
//           placeholder="Email" 
//           required 
//         /><br/>
//         <input 
//           type="password" 
//           value={password} 
//           onChange={e => setPassword(e.target.value)} 
//           placeholder="Password" 
//           required 
//         /><br/>
        
//         <div style={{ marginTop: "15px", marginBottom: "15px" }}>
//           <button type="submit" style={{ marginRight: "10px" }}>
//             🔐 Secure Login
//           </button>
          
//           <button 
//             type="button" 
//             onClick={handleVulnerableLogin}
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
//             ⚠️ Login with SQL Injection
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
//           Fill SQL Injection Example
//         </button>
//         <div style={{ fontSize: "12px", color: "#856404" }}>
//           <strong>Email:</strong> shiraz@gmail.com<br/>
//           <strong>Password:</strong> ' OR '1'='1<br/>
//           <small>This will bypass the login check by making the SQL condition always true</small>
//         </div>
//       </div>

//       {message && <p style={{ color: "red", marginTop: "10px" }}>{message}</p>}
      
//       <button onClick={() => navigate("/")} style={{ marginTop: "10px" }}>
//         ← Back
//       </button>
//     </div>
//   );
// }




import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const API = "http://localhost:8081/aii/users";
const SQLI_API = "http://localhost:8081/aii/sqli";

export default function LoginScreen() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();
    setMessage("");

    try {
      const res = await fetch(`${API}/login/${email}/${password}`);

      if (!res.ok) {
        const errorResponse = await res.json();
        const errorText = errorResponse.error || "An unknown error occurred";

        if (res.status === 401) {
          setMessage("❌ Unauthorized (401) - Check CORS or credentials.");
        } else {
          setMessage("❌ " + errorText);
        }
        return;
      }

      const user = await res.json();
      localStorage.setItem("userName", user.username || user.userId?.email);
      localStorage.setItem("userRole", user.role);
      localStorage.setItem("userEmail", user.userId?.email);
      //alert(`Welcome ${user.username || user.userId?.email}`);
      navigate("/user-home");

    } catch (err) {
      console.error("Login error:", err);
      setMessage("❌ Server error. Please try again later.");
    }
  }

  // SQL Injection vulnerable login function
  async function handleVulnerableLogin(e) {
    e.preventDefault();
    setMessage("");

    try {
      const res = await fetch(`${SQLI_API}/vulnerable-login`, {
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

      console.log("Response status:", res.status);

      if (!res.ok) {
        let errorText;
        try {
          const errorResponse = await res.json();
          errorText = errorResponse.error || `HTTP ${res.status}: ${res.statusText}`;
        } catch (jsonError) {
          // If response is not JSON, get text
          const textResponse = await res.text();
          errorText = `Server error: ${res.status} - ${textResponse}`;
          console.log("Non-JSON response:", textResponse);
        }
        setMessage("❌ " + errorText);
        return;
      }

      const user = await res.json();
      console.log("Vulnerable login successful:", user);
      
      localStorage.setItem("userName", user.username || "Hacked User");
      localStorage.setItem("userRole", user.role || "ADMIN");
      localStorage.setItem("userEmail", user.email || email);
      alert(`SQL Injection Success! Welcome ${user.username || "Hacked User"}`);
      navigate("/user-home");

    } catch (err) {
      console.error("Vulnerable login error:", err);
      setMessage("❌ Network error or server issue: " + err.message);
    }
  }

  // Function to demonstrate common SQL injection payloads
  function fillSQLInjectionExample() {
    setEmail("shiraz@gmail.com");
    setPassword("' OR '1'='1");
  }

  return (
    <div className="page-container">
      <h2>Sign In</h2>
      <form onSubmit={handleLogin}>
        <input 
          type="email" 
          value={email} 
          onChange={e => setEmail(e.target.value)} 
          placeholder="Email" 
          required 
          style={{ width: "100%", marginBottom: "10px", padding: "8px", boxSizing: "border-box" }}
        /><br/>
        
        <div style={{ position: "relative", marginBottom: "10px" }}>
          <input 
            type={showPassword ? "text" : "password"}
            value={password} 
            onChange={e => setPassword(e.target.value)} 
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
        
        <div style={{ marginTop: "15px", marginBottom: "15px" }}>
          <button type="submit" style={{ marginRight: "10px" }}>
             Login with XSS
          </button>
          
          <button 
            type="button" 
            onClick={handleVulnerableLogin}
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
            ⚠️ Login with SQL Injection
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
          Fill SQL Injection Example
        </button>
        <div style={{ fontSize: "12px", color: "#856404" }}>
          <strong>Email:</strong> shiraz@gmail.com<br/>
          <strong>Password:</strong> ' OR '1'='1<br/>
          <small>This will bypass the login check by making the SQL condition always true</small>
        </div>
      </div>

      {message && <p style={{ color: "red", marginTop: "10px" }}>{message}</p>}
      
      <button onClick={() => navigate("/")} style={{ marginTop: "10px" }}>
        ← Back
      </button>
    </div>
  );
}