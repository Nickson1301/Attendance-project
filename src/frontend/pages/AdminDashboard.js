
import { useState } from "react";
import ManageUsers from "./ManageUsers";
import ApproveLeaves from "./ApproveLeaves";
import Reports from "./Reports";
import './AdminDashboard.css'

function AdminDashboard(){
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const logout = ()=>{ localStorage.removeItem('user'); window.location.href = '/'; }
  const [active, setActive] = useState('students');

  return(
    <div className="page-wrapper">
      <div className="page-card dashboard-card">
        <div className="dashboard-header">
          <h2 className="page-title">Admin Dashboard</h2>
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
          <div className="dashboard-layout">
            <aside className="sidebar">
              <button className={active==='students'? 'sidebar-btn active' : 'sidebar-btn'} onClick={()=>setActive('students')}>Student Details</button>
              <button className={active==='teachers'? 'sidebar-btn active' : 'sidebar-btn'} onClick={()=>setActive('teachers')}>Teacher Details</button>
              <button className={active==='attendance'? 'sidebar-btn active' : 'sidebar-btn'} onClick={()=>setActive('attendance')}>Attendance</button>
              <button className={active==='leaves'? 'sidebar-btn active' : 'sidebar-btn'} onClick={()=>setActive('leaves')}>Leave Reports</button>
            </aside>

            <main className="content">
              {active === 'students' && <ManageUsers view="students" />}
              {active === 'teachers' && <ManageUsers view="teachers" />}
              {active === 'attendance' && <Reports />}
              {active === 'leaves' && <ApproveLeaves />}
            </main>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard;
