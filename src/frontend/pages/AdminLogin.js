
import { useState } from "react";
import API from "../../api";
import { useNavigate} from "react-router-dom";
import './style.css'

function AdminLogin(){
  const [uid,setUid]=useState("");
  const [password,setPassword]=useState("");
  const navigate=useNavigate();

  const adminlogin=async()=>{
    const res=await API.get(`/admin?uid=${uid}&password=${password}`);
    if(res.data.length>0){
      const admin=res.data[0];
      localStorage.setItem("user",JSON.stringify(admin));
      if(admin.role==="Admin") navigate("/admin");
    } else alert("No admin found-invalid");
  }

  return(
    <div className="page-wrapper">
      <div className="page-card">
        <h2 className="page-title">Admin Login</h2>
        <input placeholder="Admin ID" onChange={e=>setUid(e.target.value)} />
        <input type="password" placeholder="Password" onChange={e=>setPassword(e.target.value)} />
        <button onClick={adminlogin}>Sign In</button>
      </div>
    </div>
  )
}
export default AdminLogin;
