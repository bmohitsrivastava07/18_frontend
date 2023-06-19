import { useOktaAuth } from "@okta/okta-react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }:{children: any}) {
    const {authState}=useOktaAuth();
  return authState?.isAuthenticated ? children : <Navigate to="/login"  />;
}

export default ProtectedRoute;