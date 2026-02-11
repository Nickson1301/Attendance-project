
import Attendance from "./Attendance";
import Leave from "./Leave";
import './style.css'

function StudentDashboard(){
  return(
    <div className="container">
      <h2>Student Dashboard</h2>
      <Attendance/>
      <Leave/>
    </div>
  )
}
export default StudentDashboard;
