
import Attendance from "./Attendance";
import Leave from "./Leave";
import './TeacherDashboard.css'
import { useState,useEffect } from "react";
import API from "../../api";


function TeacherDashboard(){
   const[users,setUsers]=useState([])

  useEffect(()=>{
      API.get("/leaveRequests").then(res=>setUsers(res.data));
    },[]);
  
    const update=async(id,status)=>{
      await API.patch(`/leaveRequests/${id}`,{status});
      window.location.reload();
    }

    const logout=()=>{
      localStorage.removeItem('user');
      window.location.href = '/';
    }
    const user = JSON.parse(localStorage.getItem("user")) || {};

  return(
    <div className="page-wrapper">
      <div className="page-card dashboard-card">
        
        <div className="dashboard-header">
          <h2 className="page-title">Teacher/Staff Dashboard</h2>
          <button className="logout-btn" onClick={logout}>Logout</button>
        </div>

        <div className="dashboard-user-card">
          <div className="avatar">
            {user.name ? user.name.split(' ').map(n=>n[0]).slice(0,2).join('') : 'U'}
          </div>
          <div className="user-info">
            <div className="user-name">{user.name || 'Unknown User'}</div>
            <div className="user-role">{user.role || '-'} • {user.uid || user.email || ''}</div>
          </div>
        </div>

        <div className="dashboard-body">
          <Attendance/>
          <Leave/>
         <div className="leave-requests-section">
           <h3 className="section-title">Students Leave Request</h3>
           <div className="table-responsive">
            <table className="table table-bordered">
              <thead className="table-primary">
                <tr><th>Name</th><th>Type</th><th>Reason</th><th>Start Date</th><th>End Date</th><th>Leave Status</th><th>Approve </th><th>Reject</th></tr>
              </thead>
              <tbody>
                {users.filter(u=>(u.user_role==="Student")).map(u=>(
                  <tr key={u.id}>
                    <td>{u.user_name}</td>
                    <td>{u.leaveType || '-'}</td>
                    <td>{u.reason}</td>
                    <td>{u.startDate || '-'}</td>
                    <td>{u.endDate || '-'}</td>
                    <td>{u.status}</td>
                    <td>
                      <button onClick={()=>update(u.id,"Approved")}>Approve</button>
                    </td>
                    <td>
                      <button onClick={()=>update(u.id,"Rejected")}>Reject</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default TeacherDashboard;
