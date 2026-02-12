import { useState, useEffect } from "react";
import API from "../../api";
import "./style.css";

function Reports() {
  const [attendance, setAttendance] = useState([]);
  const [t_attendance, setT_attendance] = useState([]);

  useEffect(() => {
    API.get("/attendance").then((res) => setAttendance(res.data));
    API.get("/TeacherAttendance").then((res) => setT_attendance(res.data));
  }, []);

  return (
    <div className="card">
      <h3>Attendance Reports</h3>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>User ID</th>
            <th>Date</th>
            <th>CheckIn</th>
            <th>CheckOut</th>
          </tr>
        </thead>
        <tbody>
          {attendance.map((a) => (
            
            <tr key={a.id}>
              <td>{a.user_name}</td>
              <td>{a.date}</td>
              <td>{a.checkIn}</td>
              <td>{a.checkOut}</td>
            </tr>
          ))}
          {t_attendance.map((d) => (
            <tr key={d.id}>
              <td>{d.user_name}</td>
              <td>{d.date}</td>
              <td>{d.checkIn}</td>
              <td>{d.checkOut}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default Reports;
