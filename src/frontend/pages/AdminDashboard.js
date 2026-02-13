
import ManageUsers from "./ManageUsers";
import ApproveLeaves from "./ApproveLeaves";
import Reports from "./Reports";
import './style.css'
import { Link } from "react-router-dom";
function AdminDashboard(){
  const user = JSON.parse(localStorage.getItem("user")) || {};

  return(
    <div className="page-wrapper">
      <div className="page-card">
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
          <h2 className="page-title">Admin Dashboard</h2>
          <Link to='/' className="btn btn-primary btn-sm">Logout</Link>
        </div>

        <div className="d-flex" style={{gap:16,alignItems:'center',marginTop:12}}>
          <div style={{width:64,height:64,borderRadius:32,display:'flex',alignItems:'center',justifyContent:'center',background:'#e9f2ff',fontWeight:700,color:'#0d6efd'}}>
            {user.name ? user.name.split(' ').map(n=>n[0]).slice(0,2).join('') : 'U'}
          </div>
          <div>
            <div style={{fontSize:18,fontWeight:700}}>{user.name || 'Unknown User'}</div>
            <div className="muted">{user.role || '-'} • {user.uid || user.email || ''}</div>
          </div>
        </div>

        <ManageUsers/>
        <ApproveLeaves/>
        <Reports/>
      </div>
    </div>
  )
}
export default AdminDashboard;
