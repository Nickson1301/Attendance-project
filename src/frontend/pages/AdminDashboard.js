
import ManageUsers from "./ManageUsers";
import ApproveLeaves from "./ApproveLeaves";
import Reports from "./Reports";
import './AdminDashboard.css'

function AdminDashboard(){
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const logout = ()=>{ localStorage.removeItem('user'); window.location.href = '/'; }

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
          <div className="dashboard-sections">
            <ManageUsers/>
            <ApproveLeaves/>
            <Reports/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard;
