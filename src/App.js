
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Login from "../src/frontend/pages/Login";
import Register from "../src/frontend/pages/Register";
import StudentDashboard from "../src/frontend/pages/StudentDashboard";
import TeacherDashboard from "../src/frontend/pages/TeacherDashboard";
import AdminDashboard from "../src/frontend/pages/AdminDashboard";
import PrivateRoute from "../src/frontend/routing/PrivateRoute";
import AdminLogin from "./frontend/pages/AdminLogin";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import TeachersLogin from "./frontend/pages/TeachersLogin";

function App() {
  return (
    <BrowserRouter>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container">
          <Link className="navbar-brand" to="/">AttendanceApp</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navMenu" aria-controls="navMenu" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navMenu">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item"><Link className="nav-link" to="/">Login</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/register">Register</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/teacherlogin">Teacher</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/adminlogin">Admin</Link></li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="teacherlogin" element={<TeachersLogin/>}/>
          <Route path="adminlogin" element={<AdminLogin/>}/>
          <Route path="/register" element={<Register />} />
          <Route path="/student" element={<PrivateRoute><StudentDashboard/></PrivateRoute>} />
          <Route path="/teacher" element={<PrivateRoute><TeacherDashboard/></PrivateRoute>} />
          <Route path="/admin" element={<PrivateRoute><AdminDashboard/></PrivateRoute>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
export default App;
