
import ManageUsers from "./ManageUsers";
import ApproveLeaves from "./ApproveLeaves";
import Reports from "./Reports";
import './style.css'
import { Link } from "react-router-dom";
function AdminDashboard(){
  return(
    <div className="container">
      <div>
         <h2>Admin Dashboard</h2><Link to='/' className="btn btn-primary btn-sm">Logout</Link>
      </div>
      
      <ManageUsers/>
      <ApproveLeaves/>
      <Reports/>
    </div>
  )
}
export default AdminDashboard;
