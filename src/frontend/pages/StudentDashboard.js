
import Attendance from "./Attendance";
import Leave from "./Leave";
import './StudentDashboard.css'
import { useState } from "react";
import API from "../../api";

function StudentDashboard(){
  const logout=()=>{ localStorage.removeItem('user'); window.location.href = '/'; }
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const [activeSection, setActiveSection] = useState('attendance');
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({});

  const openEdit = ()=>{
    setForm({ uid: user.uid || '', name: user.name || '', email: user.email || '', password: user.password || '' });
    setEditing(true);
    setActiveSection('profile');
  }

  const handleChange = (k,v)=> setForm(prev=>({ ...prev, [k]: v }));

  const saveProfile = async ()=>{
    try{
      const id = user.id;
      const res = await API.patch(`/users/${id}`, form);
      const updated = res.data || { ...user, ...form };
      localStorage.setItem('user', JSON.stringify(updated));
      window.dispatchEvent(new Event('authChange'));
      setEditing(false);
      setActiveSection('attendance');
    }catch(err){ console.error(err); alert('Update failed'); }
  }

  const cancelEdit = ()=>{ setEditing(false); setForm({}); setActiveSection('attendance'); }

  return(
    <div className="page-wrapper">
      <div className="page-card dashboard-card">
        <div className="dashboard-header">
          <h2 className="page-title">Student Dashboard</h2>
          <button className="logout-btn" onClick={logout}>Logout</button>
        </div>

        <div className="dashboard-user-card">
          <div className="avatar">
            {user.name ? user.name.split(' ').map(n=>n[0]).slice(0,2).join('') : 'U'}
          </div>
          <div className="user-info">
            <div className="user-name">{user.name || 'Unknown User'}</div>
            <div className="user-role">{user.role || '-' } • {user.uid || user.email || ''}</div>
          </div>
        </div>

        <div className="dashboard-body">
          <div className="dashboard-layout">
            <aside className="sidebar">
              <button className={activeSection==='attendance'? 'sidebar-btn active' : 'sidebar-btn'} onClick={()=>setActiveSection('attendance')}>Attendance</button>
              <button className={activeSection==='leave'? 'sidebar-btn active' : 'sidebar-btn'} onClick={()=>setActiveSection('leave')}>Leave</button>
              <button className={activeSection==='profile'? 'sidebar-btn active' : 'sidebar-btn'} onClick={openEdit}>Edit Profile</button>
            </aside>

            <main className="content">
              {activeSection === 'attendance' && !editing && <Attendance/>}
              {activeSection === 'leave' && !editing && <Leave/>}
              {activeSection === 'profile' && editing && (
                <div className="page-card">
                  <h3 className="page-title">Edit Profile</h3>
                  <div className="page-main-div" style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12,marginTop:12}}>
                    <div className="edit-profile-div">
                      <label className="edit-profile">UID</label>
                      <input value={form.uid||''} onChange={e=>handleChange('uid',e.target.value)} />
                    </div>
                    <div className="edit-profile-div">
                      <label className="edit-profile">Name</label>
                      <input value={form.name||''} onChange={e=>handleChange('name',e.target.value)} />
                    </div>
                    <div className="edit-profile-div">
                      <label className="edit-profile">Email</label>
                      <input value={form.email||''} onChange={e=>handleChange('email',e.target.value)} />
                    </div>
                    <div className="edit-profile-div">
                      <label className="edit-profile">Password</label>
                      <input type="password" value={form.password||''} onChange={e=>handleChange('password',e.target.value)} />
                    </div>
                  </div>
                  <div style={{marginTop:12}}>
                    <button onClick={saveProfile} style={{marginRight:8}}>Save</button>
                    <button onClick={cancelEdit}>Cancel</button>
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

export default StudentDashboard;
