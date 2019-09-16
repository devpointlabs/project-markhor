import React, { useState, useContext, } from "react";
import { AuthContext, } from "../../providers/AuthProvider";
import { navigate, } from "@reach/router";
import { Button, TextField, Typography } from "@material-ui/core";

const CourseRegister = ({ id, token, }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { course_register_authenticate, } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    course_register_authenticate({ email, password, id, }, navigate);
    navigate("/");
  };

  return (
    <div>
      <Typography variant="h3" component="h1" gutterBottom>
        Login to register for the course
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Email"
          fullWidth
          value={email}
          onChange={e => setEmail(e.target.value)}
          margin="normal"
          variant="outlined"
          required
          type="email"
        />
        <TextField
          label="Password"
          fullWidth
          value={password}
          onChange={e => setPassword(e.target.value)}
          margin="normal"
          variant="outlined"
          type="password"
          required
        />
        <br />
        <br />
        <Button variant="contained" type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default CourseRegister;
