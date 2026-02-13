import { useState } from "react";
import API from "../../api";
import { useNavigate } from "react-router-dom";
import "./style.css";

function TeachersLogin() {
  const [uid, setUid] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const teacherlogin=async()=>{
    const res=await API.get(`/teachers?uid=${uid}&password=${password}`);
    console.log(res.data)
    if(res.data.length>0){
      const teacher=res.data[0];
      localStorage.setItem("user",JSON.stringify(teacher));
      if(teacher.role==="Teacher")
         navigate("/teacher");
    } else alert("No teacher found-invalid");
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
    <div className="page-wrapper">
      <div className="page-card">
        <h2 className="page-title">Teacher Login</h2>
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
