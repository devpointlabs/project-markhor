import React, { useContext, useState, } from "react";
import { AuthContext, } from "../providers/AuthProvider";
import { Link, } from "@reach/router";
import styled from "styled-components";

import { makeStyles, } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const Navbar = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const { logout, state: { user, }, } = useContext(AuthContext);

  const handleMenuClose = () => setAnchorEl(null);

  const handleProfileMenuOpen = (e) => setAnchorEl(e.currentTarget);

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <Link to="/profile" style={{ textDecoration: "none", color: "black" }}>
        <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      </Link>
      <MenuItem onClick={ e => { handleMenuClose(); logout(); } }>Sign Out</MenuItem>
    </Menu>
  );

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
              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
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
      { renderMenu }
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
