import { Navigate } from "react-router-dom";
import { useAdmin } from "../../context/AdminContext";

function ModeratorRoute({ children }) {
  const { adminAuth } = useAdmin();

  if (adminAuth.ROLE === "MODERATOR") {
    return children;
  } else {
    return <Navigate to="/auth/login" />;
  }
}

export default ModeratorRoute;
