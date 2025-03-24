import { Navigate, Outlet } from "react-router-dom";
import { getAuthToken } from "../services/auth";

export const AuthGuard = ({ roles }) => {
  const { token, user } = getAuthToken();
  if (!token) {
    return <> {roles.length === 0 ? <Outlet /> : <Navigate to={"/login"} />} </>;
  } 
  else {
    const rolee ="http://schemas.microsoft.com/ws/2008/06/identity/claims/role";
    return <> {roles.find((role) => user[rolee]==role ) ? <Outlet /> : <Navigate to={`${user[rolee].toLowerCase()}-home`} />} </>;
  }
};
