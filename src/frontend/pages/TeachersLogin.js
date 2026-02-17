import { useState, useEffect } from "react";
import API from "../../api";
import { useNavigate } from "react-router-dom";
import ForgotPassword from "./ForgotPassword";
import "./AuthLogin.css";

function TeachersLogin() {
  const [uid, setUid] = useState("");
  const [password, setPassword] = useState("");
  const [showForgot, setShowForgot] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Clear session when user visits login page
    sessionStorage.removeItem("user");
    window.dispatchEvent(new Event('authChange'));
  }, []);

  const teacherlogin=async()=>{
    if(!uid || !uid.trim()){ 
      alert('Teacher ID is required'); 
      return;
    }
    
    if(!password){ 
      alert('Password is required'); 
      return;
    }
    
    if(password.length < 8){ 
      alert('Password must be at least 8 characters'); 
      return;
    }

    try{
      const res=await API.get(`/teachers?uid=${encodeURIComponent(uid)}&password=${encodeURIComponent(password)}`);
      if(res.data && res.data.length>0){
        const teacher=res.data[0];
        sessionStorage.setItem("user",JSON.stringify(teacher));
        window.dispatchEvent(new Event('authChange'));
        if(teacher.role==="Teacher") navigate("/teacher");
      } else {
        alert("Invalid Teacher ID or Password");
      }
    }catch(err){ 
      console.error(err); 
      alert('Login failed. Check server.');
    }
  }

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h2>Teacher Login</h2>
        <input
          placeholder="Teacher ID"
          value={uid}
          onChange={(e) => setUid(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={teacherlogin}>Sign In</button>
        <button onClick={() => setShowForgot(true)} style={{marginTop:12,background:'transparent',border:'none',color:'#5b9fd8',cursor:'pointer',textDecoration:'underline'}}>Forgot Password?</button>
      </div>
      {showForgot && <ForgotPassword userType="teacher" onClose={() => setShowForgot(false)} />}
    </div>
  );
}
export default TeachersLogin;
