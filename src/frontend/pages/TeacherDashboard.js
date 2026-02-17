
import Attendance from "./Attendance";
import Leave from "./Leave";
import './TeacherDashboard.css'
import { useState,useEffect } from "react";
import API from "../../api";


function TeacherDashboard(){
   const[users,setUsers]=useState([])
   const[students,setStudents]=useState([])
   const [editingProfile, setEditingProfile] = useState(false);
   const [form, setForm] = useState({});
   const [activeSection, setActiveSection] = useState('attendance');
   const [selectedStudent, setSelectedStudent] = useState(null);
   const [editing, setEditing] = useState(false);
   const [studentForm, setStudentForm] = useState({});
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
      API.get("/users").then(res=>setStudents(res.data));
    },[]);
  
    const update=async(id,status)=>{
      await API.patch(`/leaveRequests/${id}`,{status});
      window.location.reload();
    }

    const deleteStudent=async(id)=>{
      await API.delete(`/users/${id}`);
      const res = await API.get("/users");
      setStudents(res.data);
    }

    const openEditStudent = (student) => {
      setSelectedStudent(student);
      setStudentForm({ ...student });
      setEditing(true);
    }

    const handleStudentChange = (k, v) => setStudentForm(prev=>({ ...prev, [k]: v }));

    const saveStudent = async () => {
      const id = selectedStudent.id;
      await API.patch(`/users/${id}`, studentForm);
      const res = await API.get("/users");
      setStudents(res.data);
      setEditing(false);
      setSelectedStudent(null);
      setStudentForm({});
    }

    const closeStudentPanel = () => {
      setSelectedStudent(null);
      setEditing(false);
      setStudentForm({});
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
              <button className={activeSection==='students'? 'sidebar-btn active' : 'sidebar-btn'} onClick={()=>setActiveSection('students')}>Manage Students</button>
              <button className={activeSection==='profile'? 'sidebar-btn active' : 'sidebar-btn'} onClick={openEditProfile}>Edit Profile</button>
            </aside>

            <main className="content">
              {activeSection === 'attendance' && !editingProfile && <Attendance/>}
              {activeSection === 'leave' && !editingProfile && <Leave/>}
              {activeSection === 'students' && !editingProfile && (
                <div className="page-card">
                  <h3 className="section-title">Student Details</h3>
                  <div className="table-responsive">
                    <table className="table table-bordered">
                      <thead className="table-primary">
                        <tr><th>Name</th><th>UID</th><th>Email</th><th>Role</th><th>Action</th></tr>
                      </thead>
                      <tbody>
                        {students.map(student=>(
                          <tr key={student.id}>
                            <td>{student.name}</td>
                            <td>{student.uid}</td>
                            <td>{student.email}</td>
                            <td>{student.role}</td>
                            <td>
                              <button onClick={()=>openEditStudent(student)}>Edit</button>
                              <button className="button-spacing" onClick={()=>deleteStudent(student.id)}>Delete</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
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
                  <div className="edit-profile-grid">
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
                  <div className="profile-actions">
                    <button onClick={saveProfile} className="button-group-spacing">Save</button>
                    <button onClick={cancelProfileEdit}>Cancel</button>
                  </div>
                </div>
              )}
            </main>

            {editing && selectedStudent && (
              <div className="top-drawer" onClick={closeStudentPanel}>
                <div className="drawer" onClick={e=>e.stopPropagation()}>
                  <div className="drawer-header drawer-header-flex">
                    <h3 className="page-title">Edit Student</h3>
                    <button className="drawer-close" onClick={closeStudentPanel}>Close</button>
                  </div>

                  <div className="drawer-body drawer-body-container">
                    <div className="drawer-grid">
                      <div>
                        <label className="form-label">UID</label>
                        <input value={studentForm.uid || ''} onChange={e=>handleStudentChange('uid',e.target.value)} className="form-input" />
                      </div>
                      <div>
                        <label className="form-label">Name</label>
                        <input value={studentForm.name || ''} onChange={e=>handleStudentChange('name',e.target.value)} className="form-input" />
                      </div>
                      <div>
                        <label className="form-label">Email</label>
                        <input value={studentForm.email || ''} onChange={e=>handleStudentChange('email',e.target.value)} className="form-input" />
                      </div>
                      <div>
                        <label className="form-label">Password</label>
                        <input type="password" value={studentForm.password || ''} onChange={e=>handleStudentChange('password',e.target.value)} className="form-input" />
                      </div>
                      <div>
                        <label className="form-label">Role</label>
                        <input value={studentForm.role || ''} onChange={e=>handleStudentChange('role',e.target.value)} className="form-input" />
                      </div>
                    </div>
                  </div>

                  <div className="drawer-footer drawer-footer-flex">
                    <button onClick={saveStudent} className="button-group-spacing">Save</button>
                    <button onClick={closeStudentPanel}>Cancel</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
export default TeacherDashboard;
