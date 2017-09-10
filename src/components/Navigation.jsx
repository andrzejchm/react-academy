import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Navbar, Grid, Nav, NavItem } from 'react-bootstrap';
import strings from '../config/strings';

export default function Navigation({ isLoggedIn, activeTab }) {
  let loginStatus;
  if (isLoggedIn) {
    loginStatus = (
      <Navbar.Text pullRight>
        Signed in as: <Navbar.Link className="underline" href="#">Mark Otto</Navbar.Link>
      </Navbar.Text>
    );
  } else {
    loginStatus = (
      <Navbar.Text pullRight><Link className="navbar-link" to="/login">Log in</Link></Navbar.Text>
    );
  }

  return (
    <Navbar inverse staticTop>
      <Grid>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="/">{strings.app_name}</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav activeKey={activeTab}>
            <NavItem eventKey={1} href="/repairs">Repairs</NavItem>
            <NavItem eventKey={2} href="/users">Users</NavItem>
          </Nav>
          {loginStatus}
        </Navbar.Collapse>
      </Grid>
    </Navbar>
  );
}

Navigation.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  activeTab: PropTypes.number,
};

Navigation.defaultProps = {
  activeTab: 0,
};
