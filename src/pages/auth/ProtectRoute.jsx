import { Outlet, Navigate } from "react-router-dom";

function ProtectRoute() {
  let accessToken = sessionStorage.getItem("myToken");
  let accessAuth = { token: accessToken };

  return accessAuth.token ? <Outlet /> : <Navigate to={"/auth/login"} />;
}

export default ProtectRoute;
