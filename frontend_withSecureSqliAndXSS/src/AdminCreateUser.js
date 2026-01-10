// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const API = "http://localhost:8081/aii/users";

// export default function RegisterForm() {
//   const navigate = useNavigate();
//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [message, setMessage] = useState("");

//   async function handleRegister(e) {
//     e.preventDefault();
//     setMessage("");

//     try {
//       const res = await fetch(`${API}/newUserRegister`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ username, email, password }),
//       });

//       if (!res.ok) {
//         const errorJson = await res.json();
//         const errorText = errorJson.error || "An unknown error occurred";

//         if (errorText.includes("already exists")) {
//           setMessage("❌ A user with this email already exists.");
//         } else if (res.status === 401) {
//           setMessage("❌ Unauthorized (401) - CORS or security issue.");
//         } else if (res.status === 400) {
//           setMessage("❌ " + errorText);
//         } else {
//           setMessage("❌ An unexpected error occurred.");
//         }
//         return;
//       }

//       const result = await res.json();
//       localStorage.setItem("userName", result.username);
//       alert(`Welcome ${result.username}`);
//       navigate("/user-home");

//     } catch (err) {
//       console.error(err);
//       setMessage("❌ A network error occurred.");
//     }
//   }

//   return (
//     <div className="page-container">
//       <h2>Register</h2>

//       {message && (
//         <p style={{ color: "red", fontWeight: "bold" }}>{message}</p>
//       )}

//       <form onSubmit={handleRegister}>
//         <input
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           placeholder="Username"
//           required
//         /><br />
//         <input
//           type="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           placeholder="Email"
//           required
//         /><br />
//         <input
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           placeholder="Password"
//           required
//         /><br />
//         <button type="submit">Register</button>
//       </form>

//       <button onClick={() => navigate("/")}>← Back</button>
//     </div>
//   );
// }







// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const API = "http://localhost:8081/aii/users";

// export default function RegisterForm() {
//   const navigate = useNavigate();
//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [role, setRole] = useState("END_USER"); // default role
//   const [message, setMessage] = useState("");

//   async function handleRegister(e) {
//     e.preventDefault();
//     setMessage("");

//     try {
//       const res = await fetch(`${API}/newUserRegister`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ username, email, password, role }), // include role
//       });

//       if (!res.ok) {
//         const errorJson = await res.json();
//         const errorText = errorJson.error || "An unknown error occurred";

//         if (errorText.includes("already exists")) {
//           setMessage("❌ A user with this email already exists.");
//         } else if (res.status === 401) {
//           setMessage("❌ Unauthorized (401) - CORS or security issue.");
//         } else if (res.status === 400) {
//           setMessage("❌ " + errorText);
//         } else {
//           setMessage("❌ An unexpected error occurred.");
//         }
//         return;
//       }

//       const result = await res.json();
//       localStorage.setItem("userName", result.username);
//       alert(`Welcome ${result.username}`);
//       navigate("/user-home");

//     } catch (err) {
//       console.error(err);
//       setMessage("❌ A network error occurred.");
//     }
//   }

//   return (
//     <div className="page-container">
//       <h2>Register</h2>

//       {message && (
//         <p style={{ color: "red", fontWeight: "bold" }}>{message}</p>
//       )}

//       <form onSubmit={handleRegister}>
//         <input
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           placeholder="Username"
//           required
//         /><br />
//         <input
//           type="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           placeholder="Email"
//           required
//         /><br />
//         <input
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           placeholder="Password"
//           required
//         /><br />
//         <label>
//           Role:
//           <select value={role} onChange={(e) => setRole(e.target.value)} required>
//             <option value="END_USER">End User</option>
//             <option value="ADMIN">Admin</option>
//           </select>
//         </label><br />
//         <button type="submit">Register</button>
//       </form>

//       <button onClick={() => navigate("/")}>← Back</button>
//     </div>
//   );
// }



// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const API = "http://localhost:8081/aii/admin";

// export default function AdminCreateUser() {
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
//       const res = await fetch(`${API}/create_endUser`, {
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
//       localStorage.setItem("newClientName", result.username);
//       navigate("/admin/client-confirmation");
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

//       <button onClick={() => navigate("/user-home")}>
//         🔙 Back to Admin Panel
//       </button>
//     </div>
//   );
// }






import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const API = "http://localhost:8081/aii/admin";

export default function AdminCreateUser() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("END_USER");
  const [message, setMessage] = useState("");

  async function handleRegister(e) {
    e.preventDefault();
    setMessage("");

    try {
      const res = await fetch(`${API}/create_endUser`, {
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

      // ✅ Do NOT overwrite admin session data
      // ✅ Store only for confirmation display
      localStorage.setItem("newClientName", result.username);
      navigate("/admin/client-confirmation");

    } catch (err) {
      setMessage("❌ Network error.");
    }
  }

  return (
    <div className="page-container">
      <h2>Register</h2>

      {message && <p style={{ color: "red", fontWeight: "bold" }}>{message}</p>}

      <form onSubmit={handleRegister}>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
          style={{ marginBottom: "10px", padding: "8px", width: "100%" }}
        /><br />

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          style={{ marginBottom: "10px", padding: "8px", width: "100%" }}
        /><br />

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          style={{ marginBottom: "10px", padding: "8px", width: "100%" }}
        /><br />

        <label htmlFor="role">Choose Role:</label><br />
        <select
          id="role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          style={{ marginBottom: "15px", padding: "8px", width: "100%" }}
        >
          <option value="END_USER">End User</option>
          <option value="ADMIN">Admin</option>
        </select><br />

        <button type="submit" style={{ padding: "10px 20px", marginBottom: "10px" }}>
          Register
        </button>
      </form>

      <button onClick={() => navigate("/user-home")} style={{ padding: "10px 20px" }}>
        ← Back
      </button>
    </div>
  );
}
