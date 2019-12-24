import React, { useState } from "react";
import { Container, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import { login } from "../Redux/actions";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

const useStyles = makeStyles(theme => ({
  form: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "column",
    width: "500px"
  },
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  textField: {
    "& label.Mui-focused": {
      color: "green"
    },
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 500
  }
}));

const CssTextField = withStyles({
  root: {
    "& label.Mui-focused": {
      color: "rgb(60,179, 113)"
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "rgb(60,179, 113)"
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "rgb(60,179, 113)"
      },
      "&:hover fieldset": {
        borderColor: "rgb(60,179, 113)"
      },
      "&.Mui-focused fieldset": {
        borderColor: "rgb(60,179, 113)"
      }
    }
  }
})(TextField);

const Login = ({ login, history }) => {
  const classes = useStyles();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onChangeUsername = e => {
    setUsername(e.target.value);
  };
  const onChangePassword = e => {
    setPassword(e.target.value);
  };
  const handleSubmit = e => {
    e.preventDefault();
    document.cookie = "loggedIn=true;max-age=60*1000";
    const user = { username, password };

    login(user);
    console.log(user);
    history.push("/listings");
  };
  console.log(document.cookie);

  return (
    <Container className={classes.container}>
      <form className={classes.form} onSubmit={handleSubmit}>
        <CssTextField
          id="username"
          onChange={onChangeUsername}
          label="Username"
          type="username"
          margin="normal"
        />
        <CssTextField
          id="password"
          onChange={onChangePassword}
          label="Password"
          type="password"
          margin="normal"
        />
        <Button
          style={{ backgroundColor: "rgb(60,179, 113)", color: "white" }}
          type="submit"
        >
          Login
        </Button>
      </form>
    </Container>
  );
};
const mapStateToProps = state => {
  console.log(state);
  return {
    user: state.user
  };
};

export default withRouter(connect(mapStateToProps, { login })(Login));