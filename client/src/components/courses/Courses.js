import React, { useState, useEffect, useContext, } from "react";
import axios from "../../utils/webRequests";
import { AuthContext, } from "../../providers/AuthProvider";
import { Link, } from "@reach/router";

import { Button, Card, CardContent, Typography, } from '@material-ui/core';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const { state: { user: { admin, }, } } = useContext(AuthContext);

  useEffect( () => {
    axios.get("/api/courses")
      .then( res => {
        setCourses(res.data.data);
      })
      .catch( err => {
        // TODO: Render Error
      })
  }, []);

  return (
    <div>
      { admin &&
        <Link to="/admin/courses/new" style={{ textDecoration: "none", color: "black" }}>
          <Button variant="contained" >
            Add Course
          </Button>
        </Link>
      }

      <br />
      <br />

      <div>
        { courses.map( course => {
          const { id, name, } = course.attributes;
          return (
            <Link to={`${id}`} key={id}>
              <Card>
                <CardContent>
                  <Typography color="textSecondary" gutterBottom>
                    { name }
                  </Typography>            
                </CardContent>
              </Card>
            </Link>
          )    
        })}
      </div>
    </div>
  );
};

export default Courses;
