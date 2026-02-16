
import { useState,useEffect, use } from "react";
import API from "../../api";
import './Leave.css'

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

  const apply=async(e)=>{
    if(e && e.preventDefault) e.preventDefault();
    if(!reason || !reason.trim()){
      alert('Please enter a reason for the leave');
      return;
    }
    if(!startDate || !endDate){
      alert('Please select start and end date');
      return;
    }
    if(new Date(startDate) > new Date(endDate)){
      alert('Start date cannot be after end date');
      return;
    }
    try{
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
    }catch(err){
      console.error(err);
      alert('Failed to apply for leave.');
    }
  }

  return(
    <div className="leave-container">
      <div className="page-card">
        <h3 className="page-title">Leave</h3>
        <form onSubmit={apply}>
          <input className="leave-reason-input" placeholder="Reason" value={reason} onChange={e=>setReason(e.target.value)}/>
        <div className="leave-type-section">
          <label className="leave-type-label">Type:</label>
          <label>
            <input type="radio" name="leaveType" value="Leave" checked={leaveType==="Leave"} onChange={e=>setLeaveType(e.target.value)} /> Leave
          </label>
          <label>
            <input type="radio" name="leaveType" value="OD" checked={leaveType==="OD"} onChange={e=>setLeaveType(e.target.value)} /> OD
          </label>
        </div>
        <div className="leave-date-section">
          <label className="leave-date-label">Start Date:</label>
          <input className="leave-date-input" type="date" value={startDate} onChange={e=>setStartDate(e.target.value)} />
          <label className="leave-date-label">End Date:</label>
          <input className="leave-date-input" type="date" value={endDate} onChange={e=>setEndDate(e.target.value)} />
        </div>
          <button className="leave-apply-btn" type="submit">Apply</button>
        </form>
        <ul className="leave-list spaced">
          {leaves.map(l=>(
            <li key={l.id}>{l.leaveType || '-'} - {l.reason} - {l.startDate || '-'} to {l.endDate || '-'} - {l.status}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}
export default Leave;
