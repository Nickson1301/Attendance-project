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
    if (res.data.length > 0) {
      const user = res.data[0];
      localStorage.setItem("user", JSON.stringify(user));
      if (user.role === "Teacher" || user.role === "Staff")
        navigate("/teacher");
      else navigate("/student");
    } else alert("Invalid Credentials");
  };

  return (
    <div className="main_sec">
      <div className="container div_con">
        <div className="div_img">
          <img src={image} alt="img"></img>
        </div>
        <div className="card div_card">
          <h2 className="header1">Student/Staff Login</h2>
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
          <p>
            New User? <Link to="/register">Register</Link>
          </p>
          <Link to="/adminlogin">Admin Login</Link>
        </div>
      </div>
    </div>
  );
}
export default Login;
