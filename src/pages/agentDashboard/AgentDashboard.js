import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Row, Col } from 'reactstrap';

/** https://www.npmjs.com/package/format-number */
import format from 'format-number';

import Widget from '../../components/Widget';
import s from './Dashboard.scss';

const accountingFormat = format({ prefix: '$' });

class AgentDashboard extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    // isFetching: PropTypes.bool,
    // isAuthenticated: PropTypes.bool,
    // errorMessage: PropTypes.string,
    agentIds: PropTypes.array,
    agents: PropTypes.object
  };

  static defaultProps = {
    agentIds: [],
    agents: {}
  };

  render() {
    const { agentIds, agents } = this.props;
    const agent = agents[String(agentIds[0])];

    return (
      <div className={s.root}>
        <h1 className="page-title">Agent Dashboard <small><small>Performance</small></small></h1>
        <Row>
          <Col lg={6}>
            <Widget title={<h5>Example <span className="fw-semi-bold">Widget</span></h5>}>
              <div>
                <p className="lead">
                  Agent Ids: <br />
                  {agentIds.join(', ')}
                </p>
                <p className="lead">
                  Agent Data: <br />
                  niprId: { agent ? agent.niprId : '' } <br />
                  totalAgentPremium: { agent ? accountingFormat(agent.totalAgentPremium) : '' }

                </p>
              </div>
            </Widget>
          </Col>
        </Row>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isFetching: state.agentData.isFetching,
    isAuthenticated: state.agentData.isAuthenticated,
    errorMessage: state.agentData.errorMessage,
    agentIds: state.agentData.agentIds,
    agents: state.agentData.agents
  };
}

export default connect(mapStateToProps)(withStyles(s)(AgentDashboard));
