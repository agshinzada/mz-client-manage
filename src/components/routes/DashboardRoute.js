import { Navigate } from "react-router-dom";
import { useAdmin } from "../../context/AdminContext";

function DashboardRoute({ children }) {
  const { adminAuth } = useAdmin();

  if (adminAuth) {
    return children;
  } else {
    return <Navigate to={"auth/login"} />;
  }
}

export default DashboardRoute;
