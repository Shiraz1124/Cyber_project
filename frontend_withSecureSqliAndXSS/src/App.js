// import React from "react";
// import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
// import RegisterForm from "./RegisterForm";
// import LoginScreen from "./LoginScreen";
// import ForgotPasswordForm from "./ForgotPasswordForm";
// import ResetPasswordForm from "./ResetPasswordForm";
// import ClientScreen from "./ClientScreen";
// import UserHomepage from "./UserHomepage";
// import ChangePasswordForm from "./ChangePasswordForm";
// import './index.css';


// function HomePage() {
//   const navigate = useNavigate();

//   return (
//     <div className="page-container">
//       <h1>📡 Communication LTD</h1>
//       <p>Welcome to our secure client portal. Choose an option below to continue:</p>
//       <button onClick={() => navigate("/login")}>Sign In</button><br/>
//       <button onClick={() => navigate("/register")}>Register</button><br/>
//       <button onClick={() => navigate("/forgot")}>Forgot Password</button>
//     </div>
//   );
// }

// export default function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<HomePage />} />
//         <Route path="/register" element={<RegisterForm />} />
//         <Route path="/login" element={<LoginScreen />} />
//         <Route path="/forgot" element={<ForgotPasswordForm />} />
//         <Route path="/reset" element={<ResetPasswordForm />} />
//         <Route path="/client" element={<ClientScreen />} />
//         <Route path="/user-home" element={<UserHomepage />} />
//         <Route path="/change-password" element={<ChangePasswordForm />} />
//         {/* <Route path="/admin/create-user" element={<AdminCreateUser />} /> */}
//       </Routes>
//     </Router>
//   );
// }


import React from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import RegisterForm from "./RegisterForm";
import LoginScreen from "./LoginScreen";
import ForgotPasswordForm from "./ForgotPasswordForm";
import ResetPasswordForm from "./ResetPasswordForm";
import ClientScreen from "./ClientScreen";
import UserHomepage from "./UserHomepage";
import ChangePasswordForm from "./ChangePasswordForm";
import AdminCreateUser from "./AdminCreateUser";
import ClientConfirmation from "./ClientConfirmation";
import AllUsersScreen from "./AllUsersScreen";
import GetSpecificUser from "./GetSpecificUser";
import './index.css';

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="page-container">
      <h1>📡 Communication LTD</h1>
      <p>Welcome to our secure client portal. Choose an option below to continue:</p>
      <button onClick={() => navigate("/login")}>Sign In</button><br/>
      <button onClick={() => navigate("/register")}>Register</button><br/>
      <button onClick={() => navigate("/forgot")}>Forgot Password</button>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/forgot" element={<ForgotPasswordForm />} />
        <Route path="/reset" element={<ResetPasswordForm />} />
        <Route path="/client" element={<ClientScreen />} />
        <Route path="/user-home" element={<UserHomepage />} />
        <Route path="/change-password" element={<ChangePasswordForm />} />
        <Route path="/admin/create_endUser" element={<AdminCreateUser />} />
        <Route path="/admin/client-confirmation" element={<ClientConfirmation />} />
        <Route path="/admin/getAllUsers" element={<AllUsersScreen />} />
        <Route path="/admin/GetSpecificUser" element={<GetSpecificUser />} />
      </Routes>
    </Router>
  );
}
