import React, { useEffect, useState, useContext, } from "react";
import axios from "../../utils/webRequests";
import { AuthContext, } from "../../providers/AuthProvider";
import { Button, Typography, } from "@material-ui/core";

const EnrollmentLink = ({ courseId, }) => {
  const [course, setCourse] = useState({});
  const { state: { user: { admin, }, } } = useContext(AuthContext);

  useEffect( () => {
    axios.get(`/api/courses/${courseId}`)
      .then( res => {
        setCourse(res.data.data.attributes);
      })
      .catch(err => {
        // TODO: Error Handle
        console.log(err.response);
      })
  }, []);

  const getLink = () => {
    axios.get(`/api/courses/${courseId}/generate_register_token`)
      .then( res => {
        setCourse(res.data.data.attributes);
      })
      .catch( err => {
        // TODO: Error Handle
        console.log(err.response);
      })
  };

  return (
    <div style={{ marginTop: "25px", }}>
      { admin && <Button variant="contained" onClick={getLink}>Get New Link</Button> }
      <br />
      <br />
      <Typography variant="h5" component="h2">
        { `localhost:3000/courses/${courseId}/register/${course.registerToken}` }
      </Typography>
    </div>
  );
};

export default EnrollmentLink;
