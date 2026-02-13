
import { useState,useEffect } from "react";
import API from "../../api";
import './style.css'


function Attendance(){
  const user=JSON.parse(localStorage.getItem("user"));
  const [records,setRecords]=useState([]);
  const [records2,setRecords2]=useState([]);

  useEffect(()=>{
    if(!user) return;
    if(user.role && user.role.toLowerCase()==="student"){
      API.get(`/attendance?user_id=${user.id}`)
      .then(res=>setRecords(res.data));
    }
    else{
       API.get(`/TeacherAttendance?user_id=${user.id}`)
      .then(res=>setRecords2(res.data));
    }
  },[user]);

  const checkIn=async()=>{
    if(!user) return;
    const today = new Date().toISOString().split("T")[0];
    try{
      if(user.role && user.role.toLowerCase()==="student"){
        const res = await API.get(`/attendance?user_id=${user.id}&date=${today}`);
        if(res.data && res.data.length>0){
          alert("You have already checked in today.");
          return;
        }
        await API.post("/attendance",{
          user_name:user.name,
          user_status:"present",
          user_id:user.id,
          user_role:user.role,
          date:today,
          checkIn:new Date().toLocaleTimeString(),
          checkOut:null
        });
      }
      else{
        const res = await API.get(`/TeacherAttendance?user_id=${user.id}&date=${today}`);
        if(res.data && res.data.length>0){
          alert("You have already checked in today.");
          return;
        }
        await API.post("/TeacherAttendance", {
          user_name:user.name,
          user_status:"present",
          user_id:user.id,
          user_role:user.role,
          date:today,
          checkIn:new Date().toLocaleTimeString(),
          checkOut:null
        });
      }
      window.location.reload();
    }catch(err){
      console.error(err);
      alert('Error during check-in');
    }
  }

  const checkOut=async(id)=>{
    if(!user) return;
    try{
      if(user.role && user.role.toLowerCase()==="student"){
         await API.patch(`/attendance/${id}`,{ checkOut:new Date().toLocaleTimeString() });
      }
      else{
         await API.patch(`/TeacherAttendance/${id}`,{ checkOut:new Date().toLocaleTimeString() });
      }
      window.location.reload();
    }catch(err){
      console.error(err);
      alert('Error during check-out');
    }
  }

  const today = new Date().toISOString().split("T")[0];
  const visibleRecords = (user && user.role && user.role.toLowerCase()==="student") ? records.slice() : records2.slice();
  if(!visibleRecords.some(r=>r.date===today)){
    visibleRecords.unshift({id:`absent-${today}`, date:today, checkIn:'Absent', checkOut:null, isAbsent:true});
  }
  const hasCheckedInToday = visibleRecords.some(r=>r.date===today && r.checkIn && r.checkIn !== 'Absent');

  return(
    <div className="">
      <h3>Attendance</h3>
      <button onClick={checkIn} disabled={hasCheckedInToday}>{hasCheckedInToday ? 'Checked In' : 'Check In'}</button>
      <table className="table table-bordered">
        <thead>
          <tr><th>Date</th><th>Check In</th><th>Check Out</th></tr>
        </thead>
        <tbody>
          {visibleRecords.map(r=>(
            <tr key={r.id}>
              <td>{r.date}</td>
              <td>{r.checkIn}</td>
              <td>
                {r.checkIn !== 'Absent' ? (
                  (r.checkOut && r.checkOut) || <button onClick={()=>checkOut(r.id)}>Check Out</button>
                ) : (
                  'Absent'
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
export default Attendance;
