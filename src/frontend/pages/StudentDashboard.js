
import { Link } from "react-router-dom";
import Attendance from "./Attendance";
import Leave from "./Leave";
import './style.css'

function StudentDashboard(){

  const logout=()=>{
      localStorage.clear();
    }
  return(
    <div className="container">
      <h2>Student Dashboard</h2><Link to='/' className="btn btn-primary btn-sm" onClick={logout}>Logout</Link>
      <Attendance/>
      <Leave/>
    </div>
  )
}
export default StudentDashboard;
