import React from "react";
import { connect } from "react-redux";

const LoggedIn = ({ user }) => {
  return (
    <div style={{ background: "lightgrey", marginTop: "-17px" }}>
      <p style={{ paddingLeft: "25px" }}>Logged In As: {user.username}</p>
    </div>
  );
};

const mapStateToProps = state => ({
  user: state.user
});
export default connect(mapStateToProps, null)(LoggedIn);