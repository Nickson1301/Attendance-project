import { useState, useEffect } from "react";
import API from "../../api";
import "./Reports.css";

function Reports() {
  const [attendance, setAttendance] = useState([]);
  const [t_attendance, setT_attendance] = useState([]);

  useEffect(() => {
    API.get("/attendance").then((res) => setAttendance(res.data));
    API.get("/TeacherAttendance").then((res) => setT_attendance(res.data));
  }, []);

  return (
    <div className="reports-container">
      <div className="reports-card">
        <h3 className="reports-title">Student Attendance Reports</h3>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>User Role</th>
              <th>User Name</th>
              <th>Date</th>
              <th>CheckIn</th>
              <th>CheckOut</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {attendance.map((a) => (
              
              <tr key={a.id}>
                <td>{a.user_role}</td>
                <td>{a.user_name}</td>
                <td>{a.date}</td>
                <td>{a.checkIn}</td>
                <td>{a.checkOut}</td>
                <td>{a.user_status || "Absent"}</td>
              </tr>
            ))}
            {/* {t_attendance.map((d) => (
              <tr key={d.id}>
                <td>{d.user_role}</td>
                <td>{d.user_name}</td>
                <td>{d.date}</td>
                <td>{d.checkIn}</td>
                <td>{d.checkOut}</td>
                <td>{d.user_status || "Absent"}</td>
              </tr>
            ))} */}
          </tbody>
        </table>
<br></br>


     <h2 className="reports-title">Teacher Attendance Reports</h2>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>User Role</th>
              <th>User Name</th>
              <th>Date</th>
              <th>CheckIn</th>
              <th>CheckOut</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {t_attendance.map((d) => (
              <tr key={d.id}>
                <td>{d.user_role}</td>
                <td>{d.user_name}</td>
                <td>{d.date}</td>
                <td>{d.checkIn}</td>
                <td>{d.checkOut}</td>
                <td>{d.user_status || "Absent"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default Reports;
