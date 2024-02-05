import { Nav, Navbar, Container } from "react-bootstrap";
import React from "react";
import { Link } from "react-router-dom";

export const NavigationBar = ({ user, onLoggedOut }) => {
  return (
    <Navbar bg="heavy" expand="lg">
      <Container fluid>
        <Navbar.Brand href="#">MyFlix</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav">
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              {user ? (
                <>
                  <Nav.Link as={Link} to="/">
                    Home
                  </Nav.Link>
                  <Nav.Link onClick={onLoggedOut}>Logout</Nav.Link>
                </>
              ) : (
                <>
                  <Nav.Link as={Link} to="/login">
                    Login
                  </Nav.Link>
                  <Nav.Link as={Link}>Signup</Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Navbar.Toggle>
      </Container>
    </Navbar>
  );
};
