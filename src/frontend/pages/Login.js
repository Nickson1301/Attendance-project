import image from "../images/background.png";
import { useState } from "react";
import API from "../../api";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";

function Login() {
  const [uid, setUid] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = async () => {
    const res = await API.get(`/users?uid=${uid}&password=${password}`);
    console.log(res.data)
    if (res.data.length > 0) {
      const user = res.data[0];
      localStorage.setItem("user", JSON.stringify(user));
      if (user.role === "Student")
         navigate("/student");
    } else alert("Invalid Credentials");
  };

  return (
    <div className="page-wrapper">
      <div className="page-card">
        <div className="main_sec">
          <div className=" div_con">
           
            <div className=" div_card">
              <h2 className="page-title header1">Student Login</h2>
          <input
            className="input1"
            placeholder="UID"
            onChange={(e) => setUid(e.target.value)}
          />
          <br></br>
          <input
            className="input1"
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <br></br>
          <button onClick={login}>Sign In</button>
          
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Login;
