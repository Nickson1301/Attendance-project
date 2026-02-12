
import { Link } from "react-router-dom";
import Attendance from "./Attendance";
import Leave from "./Leave";
import './style.css'
import { useState,useEffect } from "react";
import API from "../../api";


function TeacherDashboard(){
   const[users,setUsers]=useState([])
  useEffect(()=>{
      API.get("/users").then(res=>setUsers(res.data));
    },[]);

    const logout=()=>{
      localStorage.clear();
    }

  return(
    <div className="container">
      <table className="table table-bordered">
        <thead>
          <tr><th>Name</th><th>Role</th></tr>
        </thead>
        <tbody>
          {users.map(u=>(
            <tr key={u.id}>
              <td>{u.name}</td>
              <td>{u.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Teacher/Staff Dashboard</h2><Link to='/' className="btn btn-primary btn-sm" onClick={logout}>Logout</Link>
      <Attendance/>
      <Leave/>
      
    </div>
  )
}
export default TeacherDashboard;
