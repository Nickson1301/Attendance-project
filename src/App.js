
import { BrowserRouter, Routes, Route, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Login from "../src/frontend/pages/Login";
import Register from "../src/frontend/pages/Register";
import StudentDashboard from "../src/frontend/pages/StudentDashboard";
import TeacherDashboard from "../src/frontend/pages/TeacherDashboard";
import AdminDashboard from "../src/frontend/pages/AdminDashboard";
import PrivateRoute from "../src/frontend/routing/PrivateRoute";
import AdminLogin from "./frontend/pages/AdminLogin";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import TeachersLogin from "./frontend/pages/TeachersLogin";

function AppWrapper() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const u = JSON.parse(sessionStorage.getItem("user"));
      setUser(u);
    } catch (e) {
      setUser(null);
    }
    const onAuthChange = () => {
      try { setUser(JSON.parse(sessionStorage.getItem('user'))); } catch (e) { setUser(null); }
    }
    window.addEventListener('authChange', onAuthChange);
    window.addEventListener('storage', onAuthChange);
    return () => {
      window.removeEventListener('authChange', onAuthChange);
      window.removeEventListener('storage', onAuthChange);
    }
  }, []);

  const logout = () => {
    // Clear all session data
    sessionStorage.removeItem("user");
    localStorage.removeItem("forgotPasswordCode");
    localStorage.removeItem("forgotPasswordEmail");
    localStorage.removeItem("forgotPasswordUid");
    localStorage.removeItem("forgotPasswordUserId");
    setUser(null);
    // Dispatch auth change event to trigger route validation
    window.dispatchEvent(new Event('authChange'));
    navigate("/", { replace: true });
  };

  return (
    <>
      {!user && (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
          <div className="container">
            <Link className="navbar-brand" to="/">Attendance & Leave Management</Link>
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
      )}
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="teacherlogin" element={<TeachersLogin />} />
          <Route path="adminlogin" element={<AdminLogin />} />
          <Route path="/register" element={<Register />} />
          <Route path="/student" element={<PrivateRoute allowedRoles={["Student"]}><StudentDashboard /></PrivateRoute>} />
          <Route path="/teacher" element={<PrivateRoute allowedRoles={["Teacher"]}><TeacherDashboard /></PrivateRoute>} />
          <Route path="/admin" element={<PrivateRoute allowedRoles={["Admin"]}><AdminDashboard /></PrivateRoute>} />
        </Routes>
      </div>
    </>
  );
}
export default AppWrapper;

//export default App;



