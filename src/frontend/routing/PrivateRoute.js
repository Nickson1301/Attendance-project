
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

function PrivateRoute({ children, allowedRoles }) {
  const [isValid, setIsValid] = useState(null);

  useEffect(() => {
    // Check if user exists and is valid in sessionStorage
    const user = JSON.parse(sessionStorage.getItem("user") || "null");
    
    if (!user || !user.id || !user.role) {
      setIsValid(false);
      return;
    }

    if (allowedRoles && !allowedRoles.includes(user.role)) {
      setIsValid(false);
      return;
    }

    setIsValid(true);
  }, [allowedRoles]);

  if (isValid === null) return <div>Loading...</div>;
  if (!isValid) return <Navigate to="/" replace />;
  
  return children;
}

export default PrivateRoute;
