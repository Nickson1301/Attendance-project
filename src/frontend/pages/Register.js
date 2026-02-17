
import { useState, useEffect } from "react";
import API from "../../api";
import { useNavigate } from "react-router-dom";
import './Register.css'

function Register(){
  const [form,setForm]=useState({id:"",uid:"",name:"",email:"",password:"",role:"Student"});
  const navigate=useNavigate();

  useEffect(() => {
    // Clear session when user visits register page
    sessionStorage.removeItem("user");
    window.dispatchEvent(new Event('authChange'));
  }, []);

  const validate = () => {
    if(!form.id || !form.id.trim()){ 
      alert('ID is required'); 
      return false;
    }

    if(!form.uid || !form.uid.trim()){ 
      alert('UID is required'); 
      return false;
    }

    if(!form.name || !form.name.trim()){ 
      alert('Name is required'); 
      return false;
    }

    if(!form.name.match(/^[a-zA-Z ]{2,50}$/)){ 
      alert('Name must be 2-50 letters (only alphabets and spaces)'); 
      return false;
    }

    if(!form.email || !form.email.trim()){ 
      alert('Email is required'); 
      return false;
    }

    if(!form.email.match(/^\S+@\S+\.\S+$/)){ 
      alert('Please enter a valid email address'); 
      return false;
    }

    if(!form.password){ 
      alert('Password is required'); 
      return false;
    }

    if(form.password.length < 8){ 
      alert('Password must be at least 8 characters'); 
      return false;
    }

    return true;
  }

  const submit=async()=>{
    if(!validate()) return;
    try{
      if(form.role==="Teacher"){
        await API.post("/teachers",form);
      }
      else{
        await API.post("/users",form);
      }
      alert("Registered Successfully!");
      navigate("/");
    }catch(err){
      console.error(err);
      alert('Registration failed. Check server.');
    }
  }

  return(
    <div className="auth-wrapper">
      <div className="auth-card">
        <h2>Register</h2>
        <input 
          placeholder="ID" 
          value={form.id} 
          onChange={e=>setForm({...form,id:e.target.value})}
        />
        <input 
          placeholder="UID" 
          value={form.uid} 
          onChange={e=>setForm({...form,uid:e.target.value})}
        />
        <input 
          placeholder="Name" 
          value={form.name} 
          onChange={e=>setForm({...form,name:e.target.value})}
        />
        <input 
          placeholder="Email" 
          value={form.email} 
          onChange={e=>setForm({...form,email:e.target.value})}
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={form.password} 
          onChange={e=>setForm({...form,password:e.target.value})}
        />
        <select value={form.role} onChange={e=>setForm({...form,role:e.target.value})}>
          <option>Student</option>
          <option>Teacher</option>
        </select>
        <button onClick={submit}>Register</button>
      </div>
    </div>
  )
}
export default Register;
