
import { Link } from "react-router-dom";
import Attendance from "./Attendance";
import Leave from "./Leave";
import './style.css'

function StudentDashboard(){
  const logout=()=>{ localStorage.clear(); }
  const user = JSON.parse(localStorage.getItem("user")) || {};

  return(
    <div className="page-wrapper">
      <div className="page-card page-wrapper">
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
          <h2 className="page-title">Student Dashboard</h2>
          <Link to='/' className="btn btn-primary btn-sm" onClick={logout}>Logout</Link>
        </div>

        <div className="d-flex" style={{gap:16,alignItems:'center',marginTop:12}}>
          <div style={{width:64,height:64,borderRadius:32,display:'flex',alignItems:'center',justifyContent:'center',background:'#e9f2ff',fontWeight:700,color:'#0d6efd'}}>
            {user.name ? user.name.split(' ').map(n=>n[0]).slice(0,2).join('') : 'U'}
          </div>
          <div>
            <div style={{fontSize:18,fontWeight:700}}>{user.name || 'Unknown User'}</div>
            <div className="muted">{user.role || '-' } • {user.uid || user.email || ''}</div>
          </div>
        </div>

        <Attendance/>
        <Leave/>
      </div>
    </div>
  )
}
export default StudentDashboard;
