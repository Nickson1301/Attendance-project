
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../src/frontend/pages/Login";
import Register from "../src/frontend/pages/Register";
import StudentDashboard from "../src/frontend/pages/StudentDashboard";
import TeacherDashboard from "../src/frontend/pages/TeacherDashboard";
import AdminDashboard from "../src/frontend/pages/AdminDashboard";
import PrivateRoute from "../src/frontend/routing/PrivateRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/student" element={<PrivateRoute><StudentDashboard/></PrivateRoute>} />
        <Route path="/teacher" element={<PrivateRoute><TeacherDashboard/></PrivateRoute>} />
        <Route path="/admin" element={<PrivateRoute><AdminDashboard/></PrivateRoute>} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
