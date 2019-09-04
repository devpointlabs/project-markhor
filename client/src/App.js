import React from 'react';
import Navbar from "./components/Navbar";
import Login from "./components/Login.js"
import Register from "./components/Register.js"
import Dashboard from "./components/Dashboard.js"
import NotFound from "./components/NotFound.js"
import ProtectedRoute from "./components/ProtectedRoute.js"
import AuthRoute from "./components/AuthRoute.js"
import FetchUser from "./components/FetchUser";
import { Router, } from "@reach/router";

import Container from '@material-ui/core/Container';

const App = () => (
  <div>
    <Navbar />
    <Container maxWidth="lg">    
      <FetchUser>
        <Router>
          <ProtectedRoute path="/" component={Dashboard} />
          <Dashboard path="/" />
          <AuthRoute path="/login" component={Login} />
          <Login path="/login" />
          <Register path="/register" />
          <NotFound default />
        </Router>
      </FetchUser>
    </Container>
  </div>
);

export default App;
