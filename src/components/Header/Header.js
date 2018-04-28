import { connect } from 'react-redux';
import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import {
  Navbar,
  Nav,
  NavItem,
  NavLink,
  NavbarBrand,
} from 'reactstrap';
import AccountDropdown from './AccountDropdown';
import HeaderAlert from './HeaderAlert';
import NotificationsDropdown from './NotificationsDropdown';
import MessagesDropdown from './MessagesDropdown';
import SearchBar from './SearchBar';
import SettingsDropdown from './SettingsDropdown';
import { logoutUser } from '../../actions/user';
import { toggleSidebar } from '../../actions/navigation';

import lmLogo from '../../images/lm-images/lady-liberty-logo.png';

import s from './Header.scss';

class Header extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    sidebarState: PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);

    this.doLogout = this.doLogout.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
    this.toggleSidebar = this.toggleSidebar.bind(this);
    this.toggleSearchOpen = this.toggleSearchOpen.bind(this);

    this.state = {
      visible: true,
      messagesOpen: false,
      searchOpen: false,
      settingsOpen: false,
    };
  }

  onDismiss() {
    this.setState({ visible: false });
  }

  doLogout() {
    this.props
      .dispatch(logoutUser());
  }

  toggleSearchOpen() {
    this.setState({
      searchOpen: !this.state.searchOpen,
    });
  }

  toggleSidebar() {
    this.props.dispatch(toggleSidebar());
  }

  render() {
    return (
      <Navbar className="d-print-none">

        <NavbarBrand className={`${s.logo} ${this.props.sidebarState === 'hide' ? `${s.logoHidden}` : ''}`} href="/">
          <img className="pull-left mt-1 mr-2" src={lmLogo} alt="Liberty Mutual" width="40" />
          Agent <strong>Opportunity</strong>
        </NavbarBrand>
        <HeaderAlert />

        <SearchBar searchOpen={this.state.searchOpen} />

        <Nav className="ml-auto ml-md-0">
          <NavItem className="d-md-none">
            <NavLink onClick={this.toggleSearchOpen} className={s.navItem} href="#">
              <i className="glyphicon glyphicon-search" />
            </NavLink>
          </NavItem>
          <MessagesDropdown />
          <NotificationsDropdown />
          <NavItem className={s.divider} />
          <SettingsDropdown />
          <AccountDropdown />
          <NavItem className="d-sm-none-down">
            <NavLink onClick={this.doLogout} className={s.navItem} href="#">
              <i className="glyphicon glyphicon-off" />
            </NavLink>
          </NavItem>
          <NavItem className="d-md-none">
            <NavLink onClick={this.toggleSidebar} className={s.navItem} href="#">
              <i className="fa fa-bars" />
            </NavLink>
          </NavItem>
        </Nav>
      </Navbar>
    );
  }
}

function mapStateToProps(store) {
  return {
    sidebarState: store.navigation.sidebarState,
    sidebarPosition: store.navigation.sidebarPosition,
  };
}

export default withRouter(connect(mapStateToProps)(withStyles(s)(Header)));
