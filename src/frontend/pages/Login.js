import { useState, useEffect } from "react";
import API from "../../api";
import { useNavigate } from "react-router-dom";
import ForgotPassword from "./ForgotPassword";
import "./Login.css";

function Login() {
  const [uid, setUid] = useState("");
  const [password, setPassword] = useState("");
  const [showForgot, setShowForgot] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Clear session when user visits login page
    sessionStorage.removeItem("user");
    window.dispatchEvent(new Event('authChange'));
  }, []);

  const validateAndLogin = async (e) => {
    e.preventDefault();

    if (!uid || !uid.trim()) {
      alert("UID is required");
      return;
    }

    if (!password) {
      alert("Password is required");
      return;
    }

    if (password.length < 8) {
      alert("Password must be at least 8 characters");
      return;
    }

    try {
      const res = await API.get(`/users?uid=${encodeURIComponent(uid)}&password=${encodeURIComponent(password)}`);
      if (res.data && res.data.length > 0) {
        const user = res.data[0];
        sessionStorage.setItem("user", JSON.stringify(user));
        window.dispatchEvent(new Event('authChange'));
        if (user.role === "Student") navigate("/student");
        else navigate("/");
      } else {
        alert("Invalid UID or Password");
      }
    } catch (err) {
      console.error(err);
      alert("Login failed. Please check your connection.");
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="div_con">
        <div className="div_card">
          <h2>Student Login</h2>
          <form onSubmit={validateAndLogin}>
            <input
              className="input1"
              placeholder="UID"
              value={uid}
              onChange={(e) => setUid(e.target.value)}
            />
            <br />
            <input
              className="input1"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <br />
            <button type="submit">Sign In</button>
          </form>
          <button onClick={() => setShowForgot(true)} style={{marginTop:12,background:'transparent',border:'none',color:'#5b9fd8',cursor:'pointer',textDecoration:'underline'}}>Forgot Password?</button>
        </div>
      </div>
      {showForgot && <ForgotPassword userType="student" onClose={() => setShowForgot(false)} />}
    </div>
  );
}
export default Login;
