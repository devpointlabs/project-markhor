import React, { useContext, } from "react";
import { Redirect, } from "@reach/router";
import { AuthContext, } from "../providers/AuthProvider";

const ProtectedRoute = ({ component: Component, ...rest, }) => {
  const { state: { user, }, } = useContext(AuthContext);

  if (user)
    return <Component {...rest} />
  else
    return <Redirect from="" to="login" noThrow />
}

export default ProtectedRoute;
