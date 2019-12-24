import React, { useState, useEffect } from "react";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import GoogleMap from "./GoogleMap";

function getModalStyle() {
  const top = 50;
  const left = 50;
  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}
const useStyles = makeStyles(theme => ({
  paper: {
    position: "absolute",

    textAlign: "center",
    width: 500,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  }
}));

export default function CompanyPage(props) {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { name, description, hours, address } = props.listing;
  const [lat, setLat] = useState(30.266666);
  const [lng, setLng] = useState(-97.73333);

  useEffect(() => {
    async function google() {
      const url = `https://maps.google.com/maps/api/geocode/json?key=${process.env.REACT_APP_GOOGLE_KEY}&address=${address}`;
      const response = await fetch(url);
      const data = await response.json();

      setLat(data.results[0].geometry.location.lat);
      setLng(data.results[0].geometry.location.lng);
    }
    google();
  });

  return (
    <div>
      <a href="#">
        <p onClick={handleOpen}>{name}</p>
      </a>
      <Modal open={open} onClose={handleClose}>
        <div style={modalStyle} className={classes.paper}>
          <h1>{name}</h1>
          <h3>{address}</h3>
          <h3>Hours: {hours}</h3>
          <p>{description}</p>
          <GoogleMap lat={lat} lng={lng} />
        </div>
      </Modal>
    </div>
  );
}