
import { useState,useEffect } from "react";
import API from "../../api";
import './style.css'


function Attendance(){
  const user=JSON.parse(localStorage.getItem("user"));
  const [records,setRecords]=useState([]);
  const [records2,setRecords2]=useState([]);


  useEffect(()=>{
    API.get(`/attendance?user_id=${user.id}`)
    .then(res=>setRecords(res.data));
  },[]);

  const checkIn=async()=>{
     if(user.role==="Student"){
        await API.post("/attendance",{
        user_name:user.name,
        user_id:user.id,
        user_role:user.role,
        date:new Date().toISOString().split("T")[0],
        checkIn:new Date().toLocaleTimeString(),
        checkOut:null
      });
      }
      else if(user.role === "Teacher"){
        await API.post("/TeacherAttendance", {
        user_name:user.name,
        user_id:user.id,
        user_role:user.role,
        date:new Date().toISOString().split("T")[0],
        checkIn:new Date().toLocaleTimeString(),
        checkOut:null
      });
      }
    
    // await API.post("/attendance",{
    //   user_name:user.name,
    //   user_id:user.id,
    //   user_role:user.role,
    //   date:new Date().toISOString().split("T")[0],
    //   checkIn:new Date().toLocaleTimeString(),
    //   checkOut:null
    // });
     window.location.reload();
  }

  const checkOut=async(id)=>{
    await API.patch(`/attendance/${id}`,{
      checkOut:new Date().toLocaleTimeString()
    });
    window.location.reload();
  }

  return(
    <div className="">
      <h3>Attendance</h3>
      <button onClick={checkIn}>Check In</button>
      <table className="table table-bordered">
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
