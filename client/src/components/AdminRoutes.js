import React, { useContext, } from "react";
import NotFound from "./NotFound";
import { AuthContext, } from "../providers/AuthProvider";

const AdminRoutes = ({ children, id, token, }) => {
  const { state: { user }, } = useContext(AuthContext);

  if (user && user.admin)
    return children;
  return <NotFound />
};

export default AdminRoutes;
