
import Attendance from "./Attendance";
import Leave from "./Leave";
import './TeacherDashboard.css'
import { useState,useEffect } from "react";
import API from "../../api";


function TeacherDashboard(){
   const[users,setUsers]=useState([])
   const [editingProfile, setEditingProfile] = useState(false);
   const [form, setForm] = useState({});
   const [activeSection, setActiveSection] = useState('attendance');
   const user = JSON.parse(localStorage.getItem("user")) || {};

   const openEditProfile = ()=>{
     setForm({ uid: user.uid || '', name: user.name || '', email: user.email || '', password: user.password || '' });
     setEditingProfile(true);
     setActiveSection('profile');
   }

   const handleChangeProfile = (k,v)=> setForm(prev=>({ ...prev, [k]: v }));

   const saveProfile = async ()=>{
     try{
       const id = user.id;
       const res = await API.patch(`/teachers/${id}`, form);
       const updated = res.data || { ...user, ...form };
       localStorage.setItem('user', JSON.stringify(updated));
       window.dispatchEvent(new Event('authChange'));
       setEditingProfile(false);
       setActiveSection('attendance');
     }catch(err){ console.error(err); alert('Update failed'); }
   }

   const cancelProfileEdit = ()=>{ setEditingProfile(false); setForm({}); setActiveSection('attendance'); }

  useEffect(()=>{
      API.get("/leaveRequests").then(res=>setUsers(res.data));
    },[]);
  
    const update=async(id,status)=>{
      await API.patch(`/leaveRequests/${id}`,{status});
      window.location.reload();
    }

    const logout=()=>{
      localStorage.removeItem('user');
      window.location.href = '/';
    }
  return(
    <div className="page-wrapper">
      <div className="page-card dashboard-card">
        
        <div className="dashboard-header">
          <h2 className="page-title">Teacher/Staff Dashboard</h2>
          <button className="logout-btn" onClick={logout}>Logout</button>
        </div>

        <div className="dashboard-user-card">
          <div className="avatar">
            {user.name ? user.name.split(' ').map(n=>n[0]).slice(0,2).join('') : 'U'}
          </div>
          <div className="user-info">
            <div className="user-name">{user.name || 'Unknown User'}</div>
            <div className="user-role">{user.role || '-'} • {user.uid || user.email || ''}</div>
          </div>
        </div>

        <div className="dashboard-body">
          <div className="dashboard-layout">
            <aside className="sidebar">
              <button className={activeSection==='attendance'? 'sidebar-btn active' : 'sidebar-btn'} onClick={()=>setActiveSection('attendance')}>Attendance</button>
              <button className={activeSection==='leave'? 'sidebar-btn active' : 'sidebar-btn'} onClick={()=>setActiveSection('leave')}>Leave</button>
              <button className={activeSection==='requests'? 'sidebar-btn active' : 'sidebar-btn'} onClick={()=>setActiveSection('requests')}>Leave Requests</button>
              <button className={activeSection==='profile'? 'sidebar-btn active' : 'sidebar-btn'} onClick={openEditProfile}>Edit Profile</button>
            </aside>

            <main className="content">
              {activeSection === 'attendance' && !editingProfile && <Attendance/>}
              {activeSection === 'leave' && !editingProfile && <Leave/>}
              {activeSection === 'requests' && !editingProfile && (
                <div className="page-card">
                  <h3 className="section-title">Students Leave Request</h3>
                  <div className="table-responsive">
                    <table className="table table-bordered">
                      <thead className="table-primary">
                        <tr><th>Name</th><th>Type</th><th>Reason</th><th>Start Date</th><th>End Date</th><th>Leave Status</th><th>Approve </th><th>Reject</th></tr>
                      </thead>
                      <tbody>
                        {users.filter(u=>(u.user_role==="Student")).map(u=>(
                          <tr key={u.id}>
                            <td>{u.user_name}</td>
                            <td>{u.leaveType || '-'}</td>
                            <td>{u.reason}</td>
                            <td>{u.startDate || '-'}</td>
                            <td>{u.endDate || '-'}</td>
                            <td>{u.status}</td>
                            <td>
                              <button onClick={()=>update(u.id,"Approved")}>Approve</button>
                            </td>
                            <td>
                              <button onClick={()=>update(u.id,"Rejected")}>Reject</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
              {activeSection === 'profile' && editingProfile && (
                <div className="page-card">
                  <h3 className="page-title">Edit Profile</h3>
                  <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12,marginTop:12}}>
                    <div>
                      <label>UID</label>
                      <input value={form.uid||''} onChange={e=>handleChangeProfile('uid',e.target.value)} />
                    </div>
                    <div>
                      <label>Name</label>
                      <input value={form.name||''} onChange={e=>handleChangeProfile('name',e.target.value)} />
                    </div>
                    <div>
                      <label>Email</label>
                      <input value={form.email||''} onChange={e=>handleChangeProfile('email',e.target.value)} />
                    </div>
                    <div>
                      <label>Password</label>
                      <input type="password" value={form.password||''} onChange={e=>handleChangeProfile('password',e.target.value)} />
                    </div>
                  </div>
                  <div style={{marginTop:12}}>
                    <button onClick={saveProfile} style={{marginRight:8}}>Save</button>
                    <button onClick={cancelProfileEdit}>Cancel</button>
                  </div>
                </div>
              )}
            </main>
          </div>
        </div>
      </div>
    </div>
  )
}
export default TeacherDashboard;
