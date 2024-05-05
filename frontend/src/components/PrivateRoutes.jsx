import { Outlet, Navigate } from "react-router-dom";

const PrivateRoutes = () => {
  // const verifyUser = useSelector(({ user }) => user.value.token);

  let user = localStorage.getItem("user");

  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
