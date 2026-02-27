import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { status } = useSelector((state) => state.adminAuth);

  if (!status) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;