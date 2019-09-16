import React, { useContext, } from "react";
import NotFound from "./NotFound";
import { AuthContext, } from "../providers/AuthProvider";

const ProtectedRoutes = ({ children, id, token, }) => {
  const { state: { user }, } = useContext(AuthContext);
  
  if (user) 
    return children;
  return <NotFound />
};

export default ProtectedRoutes;
