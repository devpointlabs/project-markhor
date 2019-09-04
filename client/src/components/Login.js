import React, { useContext, useState, } from "react";
import { AuthContext, } from "../providers/AuthProvider";
import { navigate, } from "@reach/router";

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { authenticate, } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    authenticate({ email, password, }, navigate);
  };

  return (
    <div>
      <Typography variant="h3" component="h1" gutterBottom>
        Login
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

export default Login;
