import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { connect } from 'react-redux';
import { Switch, Route, withRouter } from 'react-router';

// an example of react-router code-splitting
/* eslint-disable */
import loadAnother from 'bundle-loader?lazy!../../pages/another/Another';
/* eslint-enable */

// an example of react-router code-splitting
/* eslint-disable */
import loadStatisticsStats from 'bundle-loader?lazy!../../pages/statistics/stats';
import loadStatisticsCharts from 'bundle-loader?lazy!../../pages/statistics/charts';
import loadStatisticsRealtime from 'bundle-loader?lazy!../../pages/statistics/realtime';
/* eslint-enable */

import { fetchAgents } from '../../actions/agents';

import s from './Layout.scss';
import Header from '../Header';
import Sidebar from '../Sidebar';
import Bundle from '../../core/Bundle';

// Dashboard component is loaded directly as an example of server side rendering
import Dashboard from '../../pages/dashboard/Dashboard';
import AgentDashboard from '../../pages/agentDashboard/AgentDashboard';


const StatisticsStatsBundle = Bundle.generateBundle(loadStatisticsStats);
const StatisticsChartsBundle = Bundle.generateBundle(loadStatisticsCharts);
const StatisticsRealtimeBundle = Bundle.generateBundle(loadStatisticsRealtime);

const AnotherBundle = Bundle.generateBundle(loadAnother);

class Layout extends React.Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    sidebarState: PropTypes.string.isRequired,
    sidebarPosition: PropTypes.string.isRequired,
  };

  componentDidMount() {
    this.props.dispatch(fetchAgents());
  }

  render() {
    const today = new Date();
    return (
      <div className={s.root}>
        <Header toggleSidebar={this.toggleSidebar} />
        <div className={`${s.wrap} ${this.props.sidebarState === 'hide' ? 'sidebar-hidden' : ''} ${this.props.sidebarPosition === 'right' ? 'sidebar-right' : ''}`}>
          <Sidebar />
          <main className={s.content}>
            <Switch>
              <Route path="/app" exact component={Dashboard} />
              <Route path="/app/agent" exact component={AgentDashboard} />
              <Route path="/app/another" exact component={AnotherBundle} />
              <Route path="/app/statistics/stats" exact component={StatisticsStatsBundle} />
              <Route path="/app/statistics/charts" exact component={StatisticsChartsBundle} />
              <Route path="/app/statistics/realtime" exact component={StatisticsRealtimeBundle} />
            </Switch>
            <footer className={s.footer}>
              Agent Opportunity &bull; Liberty Mutual &copy; { String(today.getFullYear()) }
            </footer>
          </main>
        </div>
      </div>
    );
  }
}

function mapStateToProps(store) {
  return {
    sidebarState: store.navigation.sidebarState,
    sidebarPosition: store.navigation.sidebarPosition,
  };
}

export default withRouter(connect(mapStateToProps)(withStyles(s)(Layout)));

