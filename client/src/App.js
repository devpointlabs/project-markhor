import React from 'react';
import Navbar from "./components/Navbar";
import Login from "./components/Login.js"
import Register from "./components/Register.js"
import Dashboard from "./components/Dashboard.js"
import Profile from "./components/Profile.js"
import Courses from "./components/courses/Courses.js"
import CourseForm from "./components/courses/CourseForm.js"
import CourseView from "./components/courses/CourseView.js"
import NotFound from "./components/NotFound.js"
import ProtectedRoute from "./components/ProtectedRoute.js"
import AuthRoute from "./components/AuthRoute.js"
import FetchUser from "./components/FetchUser";
import { Router, } from "@reach/router";

import { Container } from '@material-ui/core';

const App = () => (
  <div>
    <Navbar />
    <Container maxWidth="lg">    
      <FetchUser>
        <Router>
          <ProtectedRoute path="/" component={Dashboard} />
          <ProtectedRoute path="/profile" component={Profile} />
          <ProtectedRoute path="/courses" component={Courses} />
          <ProtectedRoute path="/courses/new" component={CourseForm} />
          <ProtectedRoute path="/courses/:id" component={CourseView} />
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
