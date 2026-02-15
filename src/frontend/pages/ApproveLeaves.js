
import { useState,useEffect } from "react";
import API from '../../api'
import './ApproveLeaves.css'
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
    <div className="approve-leaves-container">
      <div className="page-card">
        <h3 className="page-title">Approve Leaves</h3>
        <div className="table-responsive">
        <table className="table table-bordered">
          <thead className="table-primary">
            <tr><th>Occupation</th><th>Name</th><th>Type</th><th>Reason</th><th>Start Date</th><th>End Date</th><th>Leave Status</th><th>Approve </th><th>Reject</th></tr>
          </thead>
          <tbody>
            {leaves.map(l=>(
              <tr key={l.id}>
                <td>{l.user_role}</td>
                <td>{l.user_name}</td>
                <td>{l.leaveType || '-'}</td>
                <td>{l.reason}</td>
                <td>{l.startDate || '-'}</td>
                <td>{l.endDate || '-'}</td>
                <td>{l.status}</td>
                <td>
                  <button onClick={()=>update(l.id,"Approved")}>Approve</button>
                </td>
                <td>
                  <button onClick={()=>update(l.id,"Rejected")}>Reject</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>
    </div>
  )
}
export default ApproveLeaves;
