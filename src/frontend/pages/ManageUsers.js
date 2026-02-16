
import { useState,useEffect } from "react";
import API from "../../api";
import './ManageUsers.css'

function ManageUsers({view='all'}){
  const [users,setUsers]=useState([]);
  const[teacher,setTeacher]=useState([])

  useEffect(()=>{
    API.get("/users").then(res=>setUsers(res.data));
    API.get("/teachers").then(res=>setTeacher(res.data));
  },[]);

  const deleteUser=async(id)=>{
    await API.delete(`/users/${id}`);
    window.location.reload();
  }
   const deleteteacher=async(id)=>{
    await API.delete(`/teachers/${id}`);
    window.location.reload();
  }

  const [selectedUser, setSelectedUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({});

  const openEdit = (u, type) => {
    setSelectedUser({ ...u, _type: type });
    setEditing(true);
    setForm({ ...u });
  }

  const handleChange = (k, v) => setForm(prev=>({ ...prev, [k]: v }));

  const saveUser = async () => {
    if(!selectedUser) return;
    const id = selectedUser.id;
    const type = selectedUser._type;
    const path = type === 'teacher' ? '/teachers' : '/users';
    await API.patch(`${path}/${id}`, form);
    const [uRes, tRes] = await Promise.all([API.get('/users'), API.get('/teachers')]);
    setUsers(uRes.data);
    setTeacher(tRes.data);
    setEditing(false);
    setSelectedUser(null);
  }

  const closePanel = () => { setSelectedUser(null); setEditing(false); setForm({}); }

  return(
    <div className="manage-users-container">
      <div className="page-card">
        {(view === 'all' || view === 'students') && (
          <>
            <h3 className="page-title">Student Details</h3>
            <div className="table-responsive">
              <table className="table table-bordered">
                <thead>
                  <tr><th>Name</th><th>Role</th><th>Action</th></tr>
                </thead>
                <tbody>
                  {users.map(u=>(
                    <tr key={u.id}>
                      <td>{u.name}</td>
                      <td>{u.role}</td>
                      <td>
                        <button onClick={()=>openEdit(u,'student')}>Edit</button>
                        <button style={{marginLeft:8}} onClick={()=>deleteUser(u.id)}>Delete</button>
                        
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {(view === 'all' || view === 'teachers') && (
          <>
            <h3 className="page-title">Teacher Details</h3>
            <div className="table-responsive">
              <table className="table table-bordered">
                <thead>
                  <tr><th>Name</th><th>Role</th><th>Action</th></tr>
                </thead>
                <tbody>
                  {teacher.map(t=>(
                    <tr key={t.id}>
                      <td>{t.name}</td>
                      <td>{t.role}</td>
                      <td>
                        <button onClick={()=>openEdit(t,'teacher')}>Edit</button>
                        <button style={{marginLeft:8}} onClick={()=>deleteteacher(t.id)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
      
      {editing && selectedUser && (
        <div className="top-drawer" onClick={closePanel}>
          <div className="drawer" onClick={e=>e.stopPropagation()}>
            <div className="drawer-header" style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
              <h3 className="page-title">Edit {selectedUser._type === 'teacher' ? 'Teacher' : 'Student'}</h3>
              <button className="drawer-close" onClick={closePanel}>Close</button>
            </div>

            <div className="drawer-body" style={{marginTop:12}}>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
                <div>
                  <label style={{display:'block',fontSize:12,marginBottom:6,textTransform:'capitalize'}}>UID</label>
                  <input value={form.uid || ''} onChange={e=>handleChange('uid',e.target.value)} style={{width:'100%',padding:8,borderRadius:6,border:'1px solid #ddd'}} />
                </div>
                <div>
                  <label style={{display:'block',fontSize:12,marginBottom:6,textTransform:'capitalize'}}>Name</label>
                  <input value={form.name || ''} onChange={e=>handleChange('name',e.target.value)} style={{width:'100%',padding:8,borderRadius:6,border:'1px solid #ddd'}} />
                </div>
                <div>
                  <label style={{display:'block',fontSize:12,marginBottom:6,textTransform:'capitalize'}}>Email</label>
                  <input value={form.email || ''} onChange={e=>handleChange('email',e.target.value)} style={{width:'100%',padding:8,borderRadius:6,border:'1px solid #ddd'}} />
                </div>
                <div>
                  <label style={{display:'block',fontSize:12,marginBottom:6,textTransform:'capitalize'}}>Password</label>
                  <input type="password" value={form.password || ''} onChange={e=>handleChange('password',e.target.value)} style={{width:'100%',padding:8,borderRadius:6,border:'1px solid #ddd'}} />
                </div>
                <div>
                  <label style={{display:'block',fontSize:12,marginBottom:6,textTransform:'capitalize'}}>Role</label>
                  <input value={form.role || ''} onChange={e=>handleChange('role',e.target.value)} style={{width:'100%',padding:8,borderRadius:6,border:'1px solid #ddd'}} />
                </div>
              </div>
            </div>

            <div className="drawer-footer" style={{marginTop:12,textAlign:'right'}}>
              <button onClick={saveUser} style={{marginRight:8}}>Save</button>
              <button onClick={closePanel}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
export default ManageUsers;
