import { Navigate, Outlet } from "react-router-dom";

const NotPrivateRoute = () => {
  let user = localStorage.getItem("user");

  return user ? <Navigate to="/" /> : <Outlet />;
};

export default NotPrivateRoute;
