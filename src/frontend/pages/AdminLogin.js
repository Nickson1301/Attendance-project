
import { useState } from "react";
import API from "../../api";
import { useNavigate} from "react-router-dom";
import './AuthLogin.css'

function AdminLogin(){
  const [uid,setUid]=useState("");
  const [password,setPassword]=useState("");
  const navigate=useNavigate();

  const adminlogin=async()=>{
    if(!uid || !uid.trim()){ 
      alert('Admin ID is required'); 
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
      const res=await API.get(`/admin?uid=${encodeURIComponent(uid)}&password=${encodeURIComponent(password)}`);
      if(res.data && res.data.length>0){
        const admin=res.data[0];
        localStorage.setItem("user",JSON.stringify(admin));
        window.dispatchEvent(new Event('authChange'));
        if(admin.role==="Admin") navigate("/admin");
      } else {
        alert("Invalid Admin ID or Password");
      }
    }catch(err){ 
      console.error(err); 
      alert('Login failed. Check server.');
    }
  }

  return(
    <div className="auth-wrapper">
      <div className="auth-card">
        <h2>Admin Login</h2>
        <input 
          placeholder="Admin ID" 
          value={uid}
          onChange={e=>setUid(e.target.value)}
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password}
          onChange={e=>setPassword(e.target.value)}
        />
        <button onClick={adminlogin}>Sign In</button>
      </div>
    </div>
  )
}
export default AdminLogin;
