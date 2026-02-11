
import ManageUsers from "./ManageUsers";
import ApproveLeaves from "./ApproveLeaves";
import Reports from "./Reports";
import './style.css'
function AdminDashboard(){
  return(
    <div className="container">
      <h2>Admin Dashboard</h2>
      <ManageUsers/>
      <ApproveLeaves/>
      <Reports/>
    </div>
  )
}
export default AdminDashboard;
