import React from "react";
import GoogleMapReact from "google-map-react";
import { Container } from "@material-ui/core/Container";
import LocationOnIcon from "@material-ui/icons/LocationOn";

const GoogleMap = props => {
  const AnyReactComponent = ({ text }) => (
    <div>
      <LocationOnIcon className="text-red" />
    </div>
  );

  const defaultProps = {
    center: {
      lat: props.lat,
      lng: props.lng
    },
    zoom: 11
  };

  return (
    <Container style={{ height: "400px", width: "450px" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_KEY }}
        center={defaultProps.center}
        defaultZoom={defaultProps.zoom}
        yesIWantToUseGoogleMapApiInternals
      >
        <AnyReactComponent lat={props.lat} lng={props.lng} />
      </GoogleMapReact>
    </Container>
  );
};
export default GoogleMap;