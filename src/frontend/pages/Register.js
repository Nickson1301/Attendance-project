
import { useState } from "react";
import API from "../../api";
import { useNavigate } from "react-router-dom";
import './style.css'

function Register(){
  const [form,setForm]=useState({uid:"",name:"",email:"",password:"",role:"Student"});
  const navigate=useNavigate();

  const submit=async()=>{
    await API.post("/users",form);
    alert("Registered Successfully");
    navigate("/");
  }

  return(
    <div className="container">
      <div className="card">
        <h2>Register</h2>
        <input placeholder="UID" onChange={e=>setForm({...form,uid:e.target.value})}/>
        <input placeholder="Name" onChange={e=>setForm({...form,name:e.target.value})}/>
        <input placeholder="Email" onChange={e=>setForm({...form,email:e.target.value})}/>
        <input type="password" placeholder="Password" onChange={e=>setForm({...form,password:e.target.value})}/>
        <select onChange={e=>setForm({...form,role:e.target.value})}>
          <option>Student</option>
          <option>Teacher</option>
          <option>Staff</option>
        </select>
        <button onClick={submit}>Register</button>
      </div>
    </div>
  )
}
export default Register;
