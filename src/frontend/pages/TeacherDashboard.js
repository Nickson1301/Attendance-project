
import Attendance from "./Attendance";
import Leave from "./Leave";
import './style.css'

function TeacherDashboard(){
  return(
    <div className="container">
      <h2>Teacher/Staff Dashboard</h2>
      <Attendance/>
      <Leave/>
    </div>
  )
}
export default TeacherDashboard;
