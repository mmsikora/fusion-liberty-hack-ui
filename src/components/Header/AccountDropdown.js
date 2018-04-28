import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import {
  NavLink,
  NavDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
import s from './Header.scss';

import sender2 from '../../images/2.png';

class AccountDropdown extends React.Component {

  constructor(props) {
    super(props);
    this.toggleAccountDropdown = this.toggleAccountDropdown.bind(this);
    this.state = {
      accountOpen: false
    };
  }

  toggleAccountDropdown() {
    this.setState({
      accountOpen: !this.state.accountOpen,
    });
  }

  render() {
    const { accountOpen } = this.state;
    return (
      <NavDropdown isOpen={accountOpen} toggle={this.toggleAccountDropdown} className="d-sm-none-down">
        <DropdownToggle nav className={s.navItem}>
          <i className="glyphicon glyphicon-user" />
        </DropdownToggle>
        <DropdownMenu right className={`${s.dropdownMenu} ${s.account}`}>
          <section>
            <img src={sender2} alt="" className={s.imageAccount} />
            Philip Daineka
          </section>
          <DropdownItem>
            <NavLink href="/profile">
              <i className="fa fa-user fa-fw" />
              Profile
            </NavLink>
          </DropdownItem>
          <DropdownItem>
            <NavLink href="/calendar">
              <i className="fa fa-calendar fa-fw" />
              Calendar
            </NavLink>
          </DropdownItem>
          <DropdownItem>
            <NavLink href="/inbox">
              <i className="fa fa-inbox fa-fw" />
              Inbox
            </NavLink>
          </DropdownItem>
        </DropdownMenu>
      </NavDropdown>
    );
  }
}

export default withStyles(s)(AccountDropdown);
