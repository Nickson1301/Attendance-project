
import { useState,useEffect } from "react";
import API from "../../api";
import './style.css'

function ManageUsers(){
  const [users,setUsers]=useState([]);

  useEffect(()=>{
    API.get("/users").then(res=>setUsers(res.data));
  },[]);

  const deleteUser=async(id)=>{
    await API.delete(`/users/${id}`);
    window.location.reload();
  }

  return(
    <div className="card">
      <h3>Manage Users</h3>
      <table>
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
  )
}
export default ManageUsers;
