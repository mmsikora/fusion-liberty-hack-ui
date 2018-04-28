import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { withRouter } from 'react-router-dom';

import { Alert, Progress } from 'reactstrap';
import { dismissAlert } from '../../actions/alerts';

import s from './Sidebar.scss';

class SidebarProjectsList extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  }

  dismissAlert(id) {
    this.props.dispatch(dismissAlert(id));
  }

  render() {
    return (
      <div>
        <h6 className={s.navTitle}>
          Projects
        </h6>
        <div className={s.sidebarAlerts}>
          {this.props.alertsList.map(alert => // eslint-disable-line
            <Alert
              key={alert.id}
              className={s.sidebarAlert} color="transparent"
              isOpen={true} // eslint-disable-line
              toggle={() => {
                this.dismissAlert(alert.id);
              }}
            >
              <span className="text-white fw-semi-bold">{alert.title}</span><br />
              <Progress className={`${s.sidebarProgress} progress-xs mt-1`} color={alert.color} value={alert.value} />
              <small>{alert.footer}</small>
            </Alert>
          )}
        </div>
      </div>
    );
  }
}

function mapStateToProps(store) {
  return {
    alertsList: store.alerts.alertsList,
  };
}

export default withRouter(connect(mapStateToProps)(withStyles(s)(SidebarProjectsList)));
