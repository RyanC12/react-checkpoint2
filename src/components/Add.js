import React, { useState, useEffect } from "react";
import { Container, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import { addBusiness } from "../redux/action";
import GoogleMap from "./GoogleMap";
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

const AddListing = ({ history, addBusiness, listings }) => {
  const classes = useStyles();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("austin tx");
  const [hours, setHours] = useState("");
  const [description, setDescription] = useState("");
  const [lat, setLat] = useState(30.266666);
  const [lng, setLng] = useState(-97.73333);

  const handleSubmit = e => {
    e.preventDefault();
    let id = listings.length + 1;
    const listing = { id, name, address, hours, description };

    addBusiness(listing);
  };

  const onChangeName = e => {
    setName(e.target.value);
  };
  const onChangeAddress = e => {
    setAddress(e.target.value);
  };
  const onChangeHours = e => {
    setHours(e.target.value);
  };
  const onChangeDescription = e => {
    setDescription(e.target.value);
  };
  useEffect(() => {
    async function google() {
      const url = `https://maps.google.com/maps/api/geocode/json?key=${
        process.env.REACT_APP_GOOGLE_KEY
      }&address=${listings[listings.length - 1].address}`;
      const response = await fetch(url);
      const data = await response.json();

      setLat(data.results[0].geometry.location.lat);
      setLng(data.results[0].geometry.location.lng);
    }
    google();
  });
  return (
    <Container className={classes.container}>
      <form className={classes.form} onSubmit={handleSubmit}>
        <CssTextField
          id="name"
          onChange={onChangeName}
          label="Name"
          type="text"
          margin="normal"
        />
        <CssTextField
          id="address"
          onChange={onChangeAddress}
          label="Address"
          type="text"
          margin="normal"
        />
        <CssTextField
          id="hours"
          onChange={onChangeHours}
          label="Hours (ex. 8AM - 9PM)"
          type="text"
          margin="normal"
        />
        <CssTextField
          id="description"
          onChange={onChangeDescription}
          label="Description"
          type="text"
          margin="normal"
        />
        <Button
          style={{ backgroundColor: "rgb(60,179, 113)", color: "white" }}
          type="submit"
        >
          Save
        </Button>
      </form>
      <GoogleMap lat={lat} lng={lng} />
    </Container>
  );
};

const mapStateToProps = state => {
  return {
    listings: state.listings
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addBusiness: listing => dispatch(addBusiness(listing))
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AddListing)
);