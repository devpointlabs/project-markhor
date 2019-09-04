import React, { useContext, } from "react";
// import axios from "../utils/webRequests";
import { AuthContext, } from "../providers/AuthProvider";
import { Link, } from "@reach/router";
import styled from "styled-components";

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const Navbar = () => {
  const classes = useStyles();
  const { logout, state: { user, }, } = useContext(AuthContext);

  return (
    <StyledNavbar>
      <AppBar position="static">        
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <Link to="/" style={{ textDecoration: "none", color: "white" }}>
              Project Markhor
            </Link>
          </Typography>
          {
            user ?
              <Button color="inherit" onClick={logout}>Logout</Button>          
            :
              <>
                <Link to="/register" style={{ textDecoration: "none", color: "white" }}>
                  <Button color="inherit">Sign Up</Button>
                </Link>
                <Link to="/login" style={{ textDecoration: "none", color: "white" }}>
                  <Button color="inherit">Login</Button>
                </Link>
              </>
          }
        </Toolbar>
      </AppBar>
    </StyledNavbar>
  );
};

const useStyles = makeStyles( theme => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const StyledNavbar = styled.div`
  flex-grow: 1;
  margin-bottom: 25px;
`;

export default Navbar;
