import React from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { Link } from 'react-router-dom';
import { Navbar, Grid, Nav, NavItem } from 'react-bootstrap';
import strings from '../config/strings';
import config from '../config/config';
import { UserInfoShape } from '../model/UserInfo';

export default function Navigation({ activeTab, userInfo, onLogout, history }) {
  let loginStatus;
  if (userInfo && userInfo.username) {
    loginStatus = (
      <Navbar.Text pullRight>
        {strings.logged_in_as}&nbsp;{userInfo.username}&nbsp;
        <Navbar.Link className="underline" onClick={() => onLogout()}>Log out</Navbar.Link>
      </Navbar.Text>
    );
  } else {
    loginStatus = (
      <Navbar.Text pullRight>
        <Link className="navbar-link" to={config.routes.login.path}>Log in</Link>
      </Navbar.Text>
    );
  }

  return (
    <Navbar inverse staticTop style={{ marginBottom: 0 }}>
      <Grid>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">{strings.app_name}</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav activeKey={activeTab}>
            <NavItem
              eventKey={1}
              onClick={() => history.push(config.routes.repairs.path)}
            >Repairs</NavItem>
            <NavItem
              eventKey={2}
              onClick={() => history.push(config.routes.users.path)}
            >Users</NavItem>
          </Nav>
          {loginStatus}
        </Navbar.Collapse>
      </Grid>
    </Navbar>
  );
}

Navigation.propTypes = {
  activeTab: PropTypes.number,
  onLogout: PropTypes.func.isRequired,
  userInfo: UserInfoShape,
  history: ReactRouterPropTypes.history.isRequired,
};

Navigation.defaultProps = {
  activeTab: 0,
  userInfo: null,
};
