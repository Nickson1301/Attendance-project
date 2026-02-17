
import { useState } from "react";
import ManageUsers from "./ManageUsers";
import ApproveLeaves from "./ApproveLeaves";
import Reports from "./Reports";
import './AdminDashboard.css'

function AdminDashboard(){
  const user = JSON.parse(sessionStorage.getItem("user")) || {};
  const logout = ()=>{ sessionStorage.removeItem('user'); window.location.href = '/'; }
  const [active, setActive] = useState('profile');

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
              <button className={active==='profile'? 'sidebar-btn active' : 'sidebar-btn'} onClick={()=>setActive('profile')}>My Profile</button>
              <button className={active==='students'? 'sidebar-btn active' : 'sidebar-btn'} onClick={()=>setActive('students')}>Student Details</button>
              <button className={active==='teachers'? 'sidebar-btn active' : 'sidebar-btn'} onClick={()=>setActive('teachers')}>Teacher Details</button>
              <button className={active==='attendance'? 'sidebar-btn active' : 'sidebar-btn'} onClick={()=>setActive('attendance')}>Attendance</button>
              <button className={active==='leaves'? 'sidebar-btn active' : 'sidebar-btn'} onClick={()=>setActive('leaves')}>Leave Reports</button>
            </aside>

            <main className="content">
              {active === 'profile' && (
                <div className="page-card">
                  <h3 className="page-title">My Profile</h3>
                  <div className="profile-info-container">
                    <div className="profile-info-item">
                      <label className="info-label">UID</label>
                      <p className="info-value">{user.uid || 'N/A'}</p>
                    </div>
                    <div className="profile-info-item">
                      <label className="info-label">Name</label>
                      <p className="info-value">{user.name || 'N/A'}</p>
                    </div>
                    <div className="profile-info-item">
                      <label className="info-label">Email</label>
                      <p className="info-value">{user.email || 'N/A'}</p>
                    </div>
                    <div className="profile-info-item">
                      <label className="info-label">Role</label>
                      <p className="info-value">{user.role || 'N/A'}</p>
                    </div>
                  </div>
                </div>
              )}
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
