
import { useState,useEffect } from "react";
import API from "../../api";
import './ManageUsers.css'

function ManageUsers(){
  const [users,setUsers]=useState([]);
  const[teacher,setTeacher]=useState([])

  useEffect(()=>{
    API.get("/users").then(res=>setUsers(res.data));
    API.get("/teachers").then(res=>setTeacher(res.data));
  },[]);

  const deleteUser=async(id)=>{
    await API.delete(`/users/${id}`);
    window.location.reload();
  }
   const deleteteacher=async(id)=>{
    await API.delete(`/teachers/${id}`);
    window.location.reload();
  }

  return(
    <div className="manage-users-container">
      <div className="page-card">
      <h3 className="page-title">Student Details</h3>
      <div className="table-responsive">
      <table className="table table-bordered">
        <thead>
          <tr><th>Name</th><th>Role</th><th>Action</th></tr>
        </thead>
        <tbody>
          {users.map(u=>(
            <tr key={u.id}>
              <td>{u.name}</td>
              <td>{u.role}</td>
              <td><button onClick={()=>deleteUser(u.id)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      <h3 className="page-title">Teacher Details</h3>
      <div className="table-responsive">
      <table className="table table-bordered">
        <thead>
          <tr><th>Name</th><th>Role</th><th>Action</th></tr>
        </thead>
        <tbody>
          {teacher.map(t=>(
            <tr key={t.id}>
              <td>{t.name}</td>
              <td>{t.role}</td>
              <td><button onClick={()=>deleteteacher(t.id)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
        </div>
        </div>
    </div>
  )
}
export default ManageUsers;
