import React from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { logout } from "../Redux/actions";

import { Link, withRouter } from "react-router-dom";
import LoggedIn from "./LoggedIn";

const useStyles = makeStyles(theme => ({
  AppBar: {
    backgroundColor: "rgb(60,179, 113)"
  }
}));

const Nav = ({ user, logout, history }) => {
  const classes = useStyles();
  console.log(user);

  const handleSubmit = e => {
    e.preventDefault();

    document.cookie = "loggedIn=false;expires=Thu, 18 Dec 2013 12:00:00 UTC";
    logout();

    history.push("/");
  };

  return (
    <>
      <AppBar position="relative" className={classes.AppBar}>
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: "1" }}>
            Austin Small Business
          </Typography>

          <ul className="nav-list">
            <li>
              <Link className="nav-list-item" to="/listings">
                Listings
              </Link>
            </li>
            {user.isAuthenticated ? (
              <>
                {" "}
                <li>
                  <Link className="nav-list-item" to="/add">
                    Add
                  </Link>
                </li>{" "}
              </>
            ) : null}
            <li>
              {user.isAuthenticated ? (
                <Link onClick={handleSubmit} className="nav-list-item" to="/">
                  Logout
                </Link>
              ) : (
                <Link className="nav-list-item" to="/">
                  Login
                </Link>
              )}
            </li>
          </ul>
        </Toolbar>
      </AppBar>
      {user.isAuthenticated ? <LoggedIn /> : null}
    </>
  );
};

const mapStateToProps = state => ({
  user: state.user
});
export default withRouter(connect(mapStateToProps, { logout })(Nav));