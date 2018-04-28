import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { withRouter } from 'react-router-dom';

import s from './Sidebar.scss';
import LinksGroup from './LinksGroup/LinksGroup';
import SidebarLabelsList from './SidebarLabelsList';
import SidebarProjectsList from './SidebarProjectsList';

class Sidebar extends React.Component {

  static propTypes = {
    sidebarOpen: PropTypes.bool.isRequired,
  };

  componentDidMount() {
    this.element.addEventListener('transitionend', () => {
      if (this.props.sidebarOpen) {
        this.element.classList.add(s.sidebarOpen);
      } else {
        this.element.classList.remove(s.sidebarOpen);
      }
    }, false);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.sidebarOpen !== this.props.sidebarOpen) {
      if (nextProps.sidebarOpen) {
        this.element.style.height = `${this.element.scrollHeight}px`;
      } else {
        this.element.style.height = `${this.element.scrollHeight}px`;
        this.element.classList.remove(s.sidebarOpen);
        setTimeout(() => {
          this.element.style.height = '';
        }, 0);
      }
    }
  }

  render() {
    return (
      /* eslint-disable */
      <div className={s.root}>
        <nav className={`${s.sidebar} sidebar`}
             ref={(nav) => { this.element = nav; }}
        >
          <ul className={s.nav}>
            <LinksGroup header="Dashboard" headerLink="/app" iconName="fa-home" />
            <LinksGroup header="Another Page" headerLink="/app/another" iconName="fa-tree" />
          </ul>

          <SidebarLabelsList />
          <SidebarProjectsList />
        </nav>
      </div>
    );
  }
}

function mapStateToProps(store) {
  return {
    sidebarOpen: store.navigation.sidebarOpen,
    activeItem: store.navigation.activeItem,
  };
}

export default withRouter(connect(mapStateToProps)(withStyles(s)(Sidebar)));