import React, { useState, } from "react";
import axios from "../../utils/webRequests";
import { Button, TextField, Typography, } from "@material-ui/core";

const CourseForm = () => {
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("/api/courses", { course: { name, } })
      .then( res => {
        debugger
      })
      .catch( err => {
        debugger
      })
  };

  return (
    <div>
      <Typography variant="h3" component="h1">New Course</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          id="outlined-name"
          label="Name"
          value={name}
          onChange={e => setName(e.target.value)}
          margin="normal"
          variant="outlined"
        />
        <br />
        <br />
        <Button type="submit" variant="contained">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default CourseForm;
