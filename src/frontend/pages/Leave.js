
import { useState,useEffect, use } from "react";
import API from "../../api";
import './style.css'

function Leave(){
  const user=JSON.parse(localStorage.getItem("user"));
  const [leaves,setLeaves]=useState([]);
  const [reason,setReason]=useState("");
  const [leaveType,setLeaveType]=useState("Leave");
  const [startDate,setStartDate]=useState("");
  const [endDate,setEndDate]=useState("");

  useEffect(()=>{
    API.get(`/leaveRequests?user_id=${user.id}`)
    .then(res=>setLeaves(res.data));
  },[]);

  const apply=async()=>{
    if(!startDate || !endDate){
      alert('Please select start and end date');
      return;
    }
    if(new Date(startDate) > new Date(endDate)){
      alert('Start date cannot be after end date');
      return;
    }
    await API.post("/leaveRequests",{
      user_id:user.id,
      user_name:user.name,
      user_role:user.role,
      reason,
      leaveType,
      startDate,
      endDate,
      status:"Pending"
    });
    window.location.reload();
  }

  return(
    <div className="page-wrapper">
      <div className="page-card">
        <h3 className="page-title">Leave</h3>
        <input placeholder="Reason" onChange={e=>setReason(e.target.value)}/>
        <div style={{marginTop:8}}>
          <label style={{marginRight:8}}>Type:</label>
          <label style={{marginRight:8}}>
            <input type="radio" name="leaveType" value="Leave" checked={leaveType==="Leave"} onChange={e=>setLeaveType(e.target.value)} /> Leave
          </label>
          <label>
            <input type="radio" name="leaveType" value="OD" checked={leaveType==="OD"} onChange={e=>setLeaveType(e.target.value)} /> OD
          </label>
        </div>
        <div style={{marginTop:8}}>
          <label style={{marginRight:8}}>Start Date:</label>
          <input type="date" value={startDate} onChange={e=>setStartDate(e.target.value)} />
          <label style={{marginLeft:16, marginRight:8}}>End Date:</label>
          <input type="date" value={endDate} onChange={e=>setEndDate(e.target.value)} />
        </div>
        <button style={{marginTop:8}} onClick={apply}>Apply</button>
        <ul className="spaced">
          {leaves.map(l=>(
            <li key={l.id}>{l.leaveType || '-'} - {l.reason} - {l.startDate || '-'} to {l.endDate || '-'} - {l.status}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}
export default Leave;
