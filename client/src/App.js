import React from 'react';
import Navbar from "./components/Navbar";
import Login from "./components/Login.js"
import Register from "./components/Register.js"
import Dashboard from "./components/Dashboard.js"
import Profile from "./components/Profile.js"
import Courses from "./components/courses/Courses.js"
import CourseForm from "./components/courses/CourseForm.js"
import CourseView from "./components/courses/CourseView.js"
import CourseRegister from "./components/courses/CourseRegister.js"
import QuizBuilder from "./components/quizzes/QuizBuilder";
import NotFound from "./components/NotFound.js"
import AuthRoute from "./components/AuthRoute.js"
import FetchUser from "./components/FetchUser";
import CheckToken from "./components/CheckToken";
import ProtectedRoutes from "./components/ProtectedRoutes";
import AdminRoutes from "./components/AdminRoutes";
import { Router, } from "@reach/router";

import { Container } from '@material-ui/core';

const App = () => (
  <div>
    <Navbar />
    <Container maxWidth="lg">    
      <FetchUser>
        <Router>
          <ProtectedRoutes path="/">
            <Dashboard path="/" />
            <Profile path="/profile" />
            <Courses path="/courses" />
            <CourseView path="/courses/:id" />
          </ProtectedRoutes>
          
          <AdminRoutes path="/admin">
            <CourseForm path="/courses/new" />
            <QuizBuilder path="/courses/:courseId/quizzes/:id" />
          </AdminRoutes>

          <CheckToken path="/courses/:id/register/:token">
            <CourseRegister path="/" />
          </CheckToken>

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
