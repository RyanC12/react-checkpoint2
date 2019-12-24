import React from "react";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Container from "@material-ui/core/Container";
import { connect } from "react-redux";
import DeleteIcon from "@material-ui/icons/Delete";
import { deleteBusiness } from "../redux/action";
import CompanyPage from "./CompanyPage";

const Listings = ({ user, listings, deleteBusiness }) => {
  return (
    <Container>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell style={{ fontWeight: "bold" }}>Name</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>Description</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>Hours</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>Address</TableCell>
            <TableCell>{user.isAuthenticated ? "Delete" : null}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {listings.map((listing, index) => (
            <TableRow key={listing.id}>
              <TableCell>
                <CompanyPage listing={listing}>{listing.name}</CompanyPage>
              </TableCell>
              <TableCell>{listing.description}</TableCell>
              <TableCell>{listing.hours}</TableCell>
              <TableCell>{listing.address}</TableCell>

              <TableCell>
                {user.isAuthenticated ? (
                  <DeleteIcon
                    onClick={() => deleteBusiness(index)}
                    className="icon text-red"
                  />
                ) : null}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
};
const mapStateToProps = state => {
  return {
    listings: state.listings,
    user: state.user
  };
};
const mapDispatchToProps = dispatch => {
  return {
    deleteBusiness: index => dispatch(deleteBusiness(index))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Listings);