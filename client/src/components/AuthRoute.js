import React, { useContext, } from "react";
import { AuthContext, } from "../providers/AuthProvider";
import { Redirect, } from "@reach/router";

const AuthRoute = ({ component: Component, ...rest }) => {
  const { state: { user, }, } = useContext(AuthContext);

  if (!user)
    return <Component {...rest} />
  else
    return <Redirect from="" to="/" noThrow />
};

export default AuthRoute;
