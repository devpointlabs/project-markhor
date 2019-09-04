import React, { useReducer, } from "react";
import axios from "../utils/webRequests";

const AUTH_START = "AUTH_START";
const AUTH_SUCCESS = "AUTH_SUCCESS";
const VALIDATE_START = "VALIDATE_START";
const AUTH_FAIL = "AUTH_FAIL";
const LOGOUT = "LOGOUT";
const REGISTRATION = "REGISTRATION";

const initialState = { loading: false, authenticated: false, user: null, };
const reducer = (state, action) => {
  switch (action.type) {
    case AUTH_START:
      return { ...state, loading: true, authenticated: false, };
    case AUTH_SUCCESS:
      return { loading: false, authenticated: true, user: action.user, };
    case AUTH_FAIL:
      return { loading: false, authenticated: false, user: null, };
    case VALIDATE_START:
      return { ...state, loading: true, };
    case LOGOUT:
      return { ...state, loading: true, user: null, }
    case REGISTRATION:
      return { ...state, laoding: true, user: action.user, };
    default:
      throw new Error("Unexpected action");
  }
}

export const AuthContext = React.createContext();
export const AuthConsumer = AuthContext.Consumer;

export const AuthProvider = ({ children, }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const registration = ({ email, password, passwordConfirmation, firstName, lastName, }, navigate) => {
    axios.post("/api/registration", { email, password, first_name: firstName, last_name: lastName, password_confirmation: passwordConfirmation, })
      .then( res => {
        dispatch({ type: REGISTRATION, user: res.data.data, });
        authenticate({ email, password, }, navigate);
        navigate("/");
      })
      .catch( err => {
        // TODO: Error handling 
        debugger
      })
  }

  const authenticate = ({ email, password, }, navigate) => {
    dispatch({ type: AUTH_START, });
    axios.post("/api/authenticate", { email, password, })
      .then( res => {
        dispatch({ type: AUTH_SUCCESS, user: res.data.data.attributes, });
        navigate("/");
      })
      .catch( err => {
        dispatch({ type: AUTH_FAIL, });
      })
  };

  const validateToken = () => {
    dispatch({ type: VALIDATE_START, });
    return new Promise( (resolve, reject) => {
      axios.post("/api/validate_token")
        .then( res => {
          dispatch({ type: AUTH_SUCCESS, user: res.data.data.attributes, });
          resolve(res);
        })
        .catch( err => {          
          dispatch({ type: AUTH_FAIL, });
          reject(err);
        })
    });
  };

  const logout = () => {
    dispatch({ type: LOGOUT, });
    window.localStorage.removeItem("userToken");
  }

  return (
    <AuthContext.Provider value={{
      state,
      dispatch,
      authenticate,
      validateToken,
      logout,
      registration,
    }}>
      { children }
    </AuthContext.Provider>
  );
};
