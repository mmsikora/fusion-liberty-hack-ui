import { connect } from 'react-redux';
import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import {
  NavDropdown,
  DropdownToggle,
  DropdownMenu,
  ButtonGroup,
  Button
} from 'reactstrap';
import { toggleVisibilitySidebar, positionSidebar } from '../../actions/navigation';

import s from './Header.scss';

class SettingsDropdown extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    sidebarState: PropTypes.string.isRequired,
    sidebarPosition: PropTypes.string.isRequired,
  };
  constructor(props) {
    super(props);
    this.moveSidebar = this.moveSidebar.bind(this);
    this.toggleSettingsDropdown = this.toggleSettingsDropdown.bind(this);
    this.toggleVisibilitySidebar = this.toggleVisibilitySidebar.bind(this);
    this.state = {
      searchFocused: false
    };
  }

  moveSidebar(position) {
    this.props.dispatch(positionSidebar(position));
  }

  toggleSettingsDropdown() {
    this.setState({
      settingsOpen: !this.state.settingsOpen,
    });
  }

  toggleVisibilitySidebar(state) {
    this.props.dispatch(toggleVisibilitySidebar(state));
  }

  render() {
    const { sidebarPosition, sidebarState } = this.props;
    const { settingsOpen } = this.state;

    return (
      <NavDropdown isOpen={settingsOpen} toggle={this.toggleSettingsDropdown} className="d-sm-none-down">
        <DropdownToggle nav className={s.navItem}>
          <i className="glyphicon glyphicon-cog" />
        </DropdownToggle>
        <DropdownMenu className={`${s.dropdownMenu} ${s.settings}`}>
          <h6>Sidebar on the</h6>
          <ButtonGroup size="sm">
            <Button onClick={() => this.moveSidebar('left')} className={sidebarPosition === 'left' ? 'active' : ''}>Left</Button>
            <Button onClick={() => this.moveSidebar('right')} className={sidebarPosition === 'right' ? 'active' : ''}>Right</Button>
          </ButtonGroup>
          <h6 className="mt-2">Sidebar</h6>
          <ButtonGroup size="sm">
            <Button onClick={() => this.toggleVisibilitySidebar('show')} className={sidebarState === 'show' ? 'active' : ''}>Show</Button>
            <Button onClick={() => this.toggleVisibilitySidebar('hide')} className={sidebarState === 'hide' ? 'active' : ''}>Hide</Button>
          </ButtonGroup>
        </DropdownMenu>
      </NavDropdown>
    );
  }
}


function mapStateToProps(store) {
  return {
    sidebarState: store.navigation.sidebarState,
    sidebarPosition: store.navigation.sidebarPosition,
  };
}

export default withRouter(connect(mapStateToProps)(withStyles(s)(SettingsDropdown)));
