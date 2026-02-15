import { useState } from "react";
import API from "../../api";
import { useNavigate } from "react-router-dom";
import "./AuthLogin.css";

function TeachersLogin() {
  const [uid, setUid] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const teacherlogin=async()=>{
    if(!uid || !uid.trim()){ alert('UID is required'); return }
    if(!password || password.length < 8){ alert('Password must be at least 8 characters'); return }
    try{
      const res=await API.get(`/teachers?uid=${encodeURIComponent(uid)}&password=${encodeURIComponent(password)}`);
      if(res.data && res.data.length>0){
        const teacher=res.data[0];
        localStorage.setItem("user",JSON.stringify(teacher));
        window.dispatchEvent(new Event('authChange'));
        if(teacher.role==="Teacher") navigate("/teacher");
      } else alert("No teacher found - invalid");
    }catch(err){ console.error(err); alert('Login failed. Check server.'); }
  }
  // const teacherlogin = async () => {
  //   try {
  //     const res = await API.get(`/teachers?uid=${uid}&password=${password}`);
  //     console.log(res.data);

  //     if (res.data.length > 0) {
  //       const teacher = res.data[0];
  //       localStorage.setItem("user", JSON.stringify(teacher));
  //       console.log("Role:", teacher.role);
  //       console.log("Navigating...");
  //       if (teacher.role?.toLowerCase().trim() === "teacher") {
  //         navigate("/teacher");
  //       }
  //     } else {
  //       alert("No teacher found - invalid");
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     alert("Login failed. Check server.");
  //   }
  // };
  // console.log(window.location.pathname);


  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h2>Teacher Login</h2>
        <input
          placeholder="teacher ID"
          onChange={(e) => setUid(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={teacherlogin}>Sign In</button>
      </div>
    </div>
  );
}
export default TeachersLogin;
