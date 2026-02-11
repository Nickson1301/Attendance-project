
import { useState,useEffect } from "react";
import API from "../../api";
import './style.css'

function Leave(){
  const user=JSON.parse(localStorage.getItem("user"));
  const [leaves,setLeaves]=useState([]);
  const [reason,setReason]=useState("");

  useEffect(()=>{
    API.get(`/leaveRequests?user_id=${user.id}`)
    .then(res=>setLeaves(res.data));
  },[]);

  const apply=async()=>{
    await API.post("/leaveRequests",{
      user_id:user.id,
      user_name:user.name,
      reason,
      status:"Pending"
    });
    window.location.reload();
  }

  return(
    <div className="card">
      <h3>Leave</h3>
      <input placeholder="Reason" onChange={e=>setReason(e.target.value)}/>
      <button onClick={apply}>Apply</button>
      <ul>
        {leaves.map(l=>(
          <li key={l.id}>{l.reason} - {l.status}</li>
        ))}
      </ul>
    </div>
  )
}
export default Leave;
