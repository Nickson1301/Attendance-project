
import { useState } from "react";
import API from "../../api";
import { useNavigate, Link } from "react-router-dom";
import './style.css'

function Login(){
  const [uid,setUid]=useState("");
  const [password,setPassword]=useState("");
  const navigate=useNavigate();

  const login=async()=>{
    const res=await API.get(`/users?uid=${uid}&password=${password}`);
    if(res.data.length>0){
      const user=res.data[0];
      localStorage.setItem("user",JSON.stringify(user));
      if(user.role==="Admin") navigate("/admin");
      else if(user.role==="Teacher" || user.role==="Staff") navigate("/teacher");
      else navigate("/student");
    } else alert("Invalid Credentials");
  }

  return(
    <div className="container">
      <div className="card">
        <h2>Login</h2>
        <input placeholder="UID" onChange={e=>setUid(e.target.value)} />
        <input type="password" placeholder="Password" onChange={e=>setPassword(e.target.value)} />
        <button onClick={login}>Sign In</button>
        <p>New User? <Link to="/register">Register</Link></p>
      </div>
    </div>
  )
}
export default Login;
