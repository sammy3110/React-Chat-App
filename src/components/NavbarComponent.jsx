import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { FiLogOut } from "react-icons/fi";

const NavbarComponent = ({ app_user, logoutUser }) => {
  return (
    <Navbar className="navbar_container" bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">Chat-App</Navbar.Brand>
          {app_user ? <FiLogOut onClick={logoutUser} size={20} /> : <></>}
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
