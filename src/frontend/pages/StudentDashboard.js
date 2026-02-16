
import Attendance from "./Attendance";
import Leave from "./Leave";
import './StudentDashboard.css'

function StudentDashboard(){
  const logout=()=>{ localStorage.removeItem('user'); window.location.href = '/'; }
  const user = JSON.parse(localStorage.getItem("user")) || {};

  return(
    <div className="page-wrapper">
      <div className="page-card dashboard-card">
        <div className="dashboard-header">
          <h2 className="page-title">Student Dashboard</h2>
          <button className="logout-btn" onClick={logout}>Logout</button>
        </div>

        <div className="dashboard-user-card">
          <div className="avatar">
            {user.name ? user.name.split(' ').map(n=>n[0]).slice(0,2).join('') : 'U'}
          </div>
          <div className="user-info">
            <div className="user-name">{user.name || 'Unknown User'}</div>
            <div className="user-role">{user.role || '-' } • {user.uid || user.email || ''}</div>
          </div>
        </div>

        <div className="dashboard-body">
          <div className="dashboard-content">
            <Attendance/>
            <Leave/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StudentDashboard;
