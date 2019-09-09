import React, { useState, useEffect, } from "react";
import axios from "../../utils/webRequests";
import { Link, } from "@reach/router";

import { Button, Card, CardContent, Typography, } from '@material-ui/core';

const Courses = () => {
  const [courses, setCourses] = useState([]);

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
      <Link to="/courses/new" style={{ textDecoration: "none", color: "black" }}>
        <Button variant="contained" >
          Add Course
        </Button>
      </Link>

      <br />
      <br />

      <div>
        { courses.map( course => {
          const { id, name, } = course.attributes;
          return (
            <Link to={`${id}`}>
              <Card key={id}>
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
