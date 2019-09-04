import React, { useContext, useState, } from "react";
import { AuthContext, } from "../providers/AuthProvider";
import { navigate, } from "@reach/router";

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const { registration, } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    registration({ email, password, passwordConfirmation, firstName, lastName, }, navigate);
  };

  return (
    <div>
      <Typography variant="h3" component="h1" gutterBottom>Sign Up</Typography>
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
          required
          type="password"
        />
        <TextField
          label="Password Confirmation"
          fullWidth
          value={passwordConfirmation}
          onChange={e => setPasswordConfirmation(e.target.value)}
          margin="normal"
          variant="outlined"
          required
          type="password"
        />
        <TextField
          label="First Name"
          fullWidth
          value={firstName}
          onChange={e => setFirstName(e.target.value)}
          margin="normal"
          variant="outlined"
          required
          type="text"
        />
        <TextField
          label="Last Name"
          fullWidth
          value={lastName}
          onChange={e => setLastName(e.target.value)}
          margin="normal"
          variant="outlined"
          required
          type="text"
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

export default Register;
