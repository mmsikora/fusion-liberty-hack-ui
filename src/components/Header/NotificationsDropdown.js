// import { connect } from 'react-redux';
import React from 'react';
// import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import {
  NavDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Badge
} from 'reactstrap';

import s from './Header.scss';

class NotificationsDropdown extends React.Component {
  // static propTypes = {
  //   dispatch: PropTypes.func.isRequired
  // };

  constructor(props) {
    super(props);

    this.toggleSupportDropdown = this.toggleSupportDropdown.bind(this);
    this.state = {
      supportOpen: false
    };
  }

  toggleSupportDropdown() {
    this.setState({
      supportOpen: !this.state.supportOpen,
    });
  }

  render() {
    return (
      <NavDropdown isOpen={this.state.supportOpen} toggle={this.toggleSupportDropdown}>
        <DropdownToggle nav className={s.navItem}>
          <i className="glyphicon glyphicon-globe" />
          <span className={s.count}>8</span>
        </DropdownToggle>
        <DropdownMenu right className={`${s.dropdownMenu} ${s.support}`}>
          <DropdownItem>
            <Badge color="danger"><i className="fa fa-bell-o" /></Badge>
            <div className={s.details}>
              Check out this awesome ticket
            </div>
          </DropdownItem>
          <DropdownItem>
            <Badge color="warning"><i className="fa fa-question-circle" /></Badge>
            <div className={s.details}>
              What is the best way to get ...
            </div>
          </DropdownItem>
          <DropdownItem>
            <Badge color="success"><i className="fa fa-info-circle" /></Badge>
            <div className={s.details}>
              This is just a simple notification
            </div>
          </DropdownItem>
          <DropdownItem>
            <Badge color="info"><i className="fa fa-plus" /></Badge>
            <div className={s.details}>
              12 new orders has arrived today
            </div>
          </DropdownItem>
          <DropdownItem>
            <Badge color="danger"><i className="fa fa-tag" /></Badge>
            <div className={s.details}>
              One more thing that just happened
            </div>
          </DropdownItem>
          <DropdownItem>
            <a>
              See all tickets <i className="fa fa-arrow-right" />
            </a>
          </DropdownItem>
        </DropdownMenu>
      </NavDropdown>
    );
  }
}


// function mapStateToProps() {
//   return {
//   };
// }

export default withRouter(withStyles(s)(NotificationsDropdown));
