
import { useState,useEffect } from "react";
import API from '../../api'
import './style.css'
function ApproveLeaves(){
  const [leaves,setLeaves]=useState([]);

  useEffect(()=>{
    API.get("/leaveRequests").then(res=>setLeaves(res.data));
  },[]);

  const update=async(id,status)=>{
    await API.patch(`/leaveRequests/${id}`,{status});
    window.location.reload();
  }

  return(
    <div className="card">
      <h3>Approve Leaves</h3>
      {leaves.map(l=>(
        <div key={l.id}>
          User {l.user_id} - {l.user_name} - {l.reason} - {l.status}
          <button onClick={()=>update(l.id,"Approved")}>Approve</button>
          <button onClick={()=>update(l.id,"Rejected")}>Reject</button>
        </div>
      ))}
    </div>
  )
}
export default ApproveLeaves;
