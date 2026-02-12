
import { Link } from "react-router-dom";
import Attendance from "./Attendance";
import Leave from "./Leave";
import './style.css'

function TeacherDashboard(){
  return(
    <div className="container">
      <h2>Teacher/Staff Dashboard</h2><Link to='/' className="btn btn-primary btn-sm">Logout</Link>
      <Attendance/>
      <Leave/>
    </div>
  )
}
export default TeacherDashboard;
