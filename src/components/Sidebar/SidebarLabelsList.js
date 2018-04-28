import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { NavItem, NavLink } from 'reactstrap';

import s from './Sidebar.scss';

class SidebarLabelsList extends React.Component {
  render() {
    return (
      <div>
        <h6 className={s.navTitle}>
          Labels
          <a className={s.actionLink}>
            <i className={`${s.glyphiconSm} glyphicon glyphicon-plus float-right`} />
          </a>
        </h6>
        <ul className={`${s.sidebarLabels} text-list`}>
          <NavItem>
            <NavLink href="#">
              <i className="fa fa-circle text-warning" />
              <span className={s.labelName}>My Recent</span>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#">
              <i className="fa fa-circle text-gray" />
              <span className={s.labelName}>Starred</span>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#">
              <i className="fa fa-circle text-danger" />
              <span className={s.labelName}>Background</span>
            </NavLink>
          </NavItem>
        </ul>
      </div>
    );
  }
}

export default withStyles(s)(SidebarLabelsList);
