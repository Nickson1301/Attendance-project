
import { useState,useEffect } from "react";
import API from "../../api";
import './style.css'


function Attendance(){
  const user=JSON.parse(localStorage.getItem("user"));
  const [records,setRecords]=useState([]);

  useEffect(()=>{
    API.get(`/attendance?user_id=${user.id}`)
    .then(res=>setRecords(res.data));
  },[]);

  const checkIn=async()=>{
    await API.post("/attendance",{
      user_id:user.id,
      date:new Date().toISOString().split("T")[0],
      checkIn:new Date().toLocaleTimeString(),
      checkOut:null
    });
    window.location.reload();
  }

  const checkOut=async(id)=>{
    await API.patch(`/attendance/${id}`,{
      checkOut:new Date().toLocaleTimeString()
    });
    window.location.reload();
  }

  return(
    <div className="card">
      <h3>Attendance</h3>
      <button onClick={checkIn}>Check In</button>
      <table>
        <thead>
          <tr><th>Date</th><th>Check In</th><th>Check Out</th></tr>
        </thead>
        <tbody>
          {records.map(r=>(
            <tr key={r.id}>
              
              <td>{r.date}</td>
              <td>{r.checkIn}</td>
              <td>
                {r.checkOut || 
                  <button onClick={()=>checkOut(r.id)}>Check Out</button>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
export default Attendance;
