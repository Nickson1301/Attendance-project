
import { useState,useEffect, use } from "react";
import API from "../../api";
import './Leave.css'

function Leave(){
  const user=JSON.parse(sessionStorage.getItem("user"));
  const [leaves,setLeaves]=useState([]);
  const [reason,setReason]=useState("");
  const [leaveType,setLeaveType]=useState("Leave");
  const [startDate,setStartDate]=useState("");
  const [endDate,setEndDate]=useState("");
  const [editingId,setEditingId]=useState(null);
  const [editReason,setEditReason]=useState("");
  const [editLeaveType,setEditLeaveType]=useState("Leave");
  const [editStartDate,setEditStartDate]=useState("");
  const [editEndDate,setEditEndDate]=useState("");

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

  const startEdit = (l) => {
    if(l.status && l.status !== "Pending"){
      alert('Cannot edit a leave request that is already processed');
      return;
    }
    setEditingId(l.id);
    setEditReason(l.reason || "");
    setEditLeaveType(l.leaveType || "Leave");
    setEditStartDate(l.startDate || "");
    setEditEndDate(l.endDate || "");
  }

  const cancelEdit = () => {
    setEditingId(null);
  }

  const saveEdit = async () => {
    const current = leaves.find(i => i.id === editingId);
    if(current && current.status && current.status !== 'Pending'){
      alert('This leave request has been processed and cannot be edited');
      setEditingId(null);
      return;
    }
    if(!editReason || !editReason.trim()){
      alert('Please enter a reason');
      return;
    }
    if(!editStartDate || !editEndDate){
      alert('Please select start and end date');
      return;
    }
    if(new Date(editStartDate) > new Date(editEndDate)){
      alert('Start date cannot be after end date');
      return;
    }
    try{
      const updated = {
        user_id:user.id,
        user_name:user.name,
        user_role:user.role,
        reason: editReason,
        leaveType: editLeaveType,
        startDate: editStartDate,
        endDate: editEndDate,
        status:"Pending"
      };
      await API.put(`/leaveRequests/${editingId}`, updated);
      setLeaves(prev => prev.map(i => i.id === editingId ? {...i, ...updated} : i));
      setEditingId(null);
    }catch(err){
      console.error(err);
      alert('Failed to update leave.');
    }
  }

  const deleteLeave = async (id) => {
    const item = leaves.find(i => i.id === id);
    if(item && item.status && item.status !== 'Pending'){
      alert('Cannot delete a leave request that is already processed');
      return;
    }
    if(!window.confirm('Delete this leave request?')) return;
    try{
      await API.delete(`/leaveRequests/${id}`);
      setLeaves(prev => prev.filter(i => i.id !== id));
    }catch(err){
      console.error(err);
      alert('Failed to delete leave.');
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
            <input type="radio" name="leaveType" value="Leave" className="leave-type" checked={leaveType==="Leave"} onChange={e=>setLeaveType(e.target.value)} /> Leave
          </label>
          <label>
            <input type="radio" name="leaveType" value="OD" className="leave-type" checked={leaveType==="OD"} onChange={e=>setLeaveType(e.target.value)} /> OD
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
        <table className="table table-bordered leave-table">
          <thead>
            <tr>
              <th>Type</th>
              <th>Reason</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {leaves.map(l => (
              <tr key={l.id} className="leave-item">
                {editingId === l.id ? (
                  <>
                    <td>
                      <label>
                        <input type="radio" name={`editType-${l.id}`} value="Leave" checked={editLeaveType==="Leave"} onChange={e=>setEditLeaveType(e.target.value)} /> Leave
                      </label>
                      <label>
                        <input type="radio" name={`editType-${l.id}`} value="OD" checked={editLeaveType==="OD"} onChange={e=>setEditLeaveType(e.target.value)} /> OD
                      </label>
                    </td>
                    <td><input className="leave-reason-input" value={editReason} onChange={e=>setEditReason(e.target.value)} /></td>
                    <td><input className="leave-date-input" type="date" value={editStartDate} onChange={e=>setEditStartDate(e.target.value)} /></td>
                    <td><input className="leave-date-input" type="date" value={editEndDate} onChange={e=>setEditEndDate(e.target.value)} /></td>
                    <td>{l.status}</td>
                    <td>
                      <button className="leave-save-btn" onClick={saveEdit}>Save</button>
                      <button className="leave-cancel-btn" onClick={cancelEdit}>Cancel</button>
                    </td>
                  </>
                ) : (
                  <>
                    <td data-label="Type">{l.leaveType || '-'}</td>
                    <td data-label="Reason">{l.reason}</td>
                    <td data-label="Start Date">{l.startDate || '-'}</td>
                    <td data-label="End Date">{l.endDate || '-'}</td>
                    <td data-label="Status">{l.status}</td>
                    <td data-label="Actions">
                      {l.status === 'Pending' ? (
                        <>
                          <button className="leave-edit-btn" onClick={()=>startEdit(l)}>Edit</button>
                          <button className="leave-delete-btn" onClick={()=>deleteLeave(l.id)}>Delete</button>
                        </>
                      ) : (
                        <>
                          <button className="leave-edit-btn" disabled>Edit</button>
                          <button className="leave-delete-btn" disabled>Delete</button>
                        </>
                      )}
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
export default Leave;
