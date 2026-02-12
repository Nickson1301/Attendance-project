import { useState } from "react";
import API from "../../api";
import { useNavigate} from "react-router-dom";
import './style.css'

function TeachersLogin(){
  const [uid,setUid]=useState("");
  const [password,setPassword]=useState("");
  const navigate=useNavigate();

  const teacherlogin=async()=>{
    const res=await API.get(`/teachers?uid=${uid}&password=${password}`);
    console.log(res.data)
    if(res.data.length>0){
      const teacher=res.data[0];
      localStorage.setItem("teacher",JSON.stringify(teacher));
      if(teacher.role==="Teacher") navigate("/teacher");
      else alert("login failed")
    } else alert("No teacher found-invalid");
  }

  return(
    <div className="">
      <div className="">
        <h2>Teacher Login</h2>
        <input placeholder="teacher ID" onChange={e=>setUid(e.target.value)} />
        <input type="password" placeholder="Password" onChange={e=>setPassword(e.target.value)} />
        <button onClick={teacherlogin}>Sign In</button>
       
      </div>
    </div>
  )
}
export default TeachersLogin;
