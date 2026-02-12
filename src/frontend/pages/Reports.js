
import { useState,useEffect } from "react";
import API from "../../api";
import './style.css'

function Reports(){
  const [attendance,setAttendance]=useState([]);

  useEffect(()=>{
    API.get("/attendance").then(res=>setAttendance(res.data));
  },[]);

  return(
    <div className="card">
      <h3>Attendance Reports</h3>
      <table className="table table-bordered">
        <thead>
          <tr><th>User ID</th><th>Date</th><th>CheckIn</th><th>CheckOut</th></tr>
        </thead>
        <tbody>
          {attendance.map(a=>(
            <tr key={a.id}>
              <td>{a.user_name}</td>
              <td>{a.date}</td>
              <td>{a.checkIn}</td>
              <td>{a.checkOut}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
export default Reports;
