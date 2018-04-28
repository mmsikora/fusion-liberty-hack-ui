import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Row, Col } from 'reactstrap';

// import { fetchAgent } from '../../actions/agents';
import Widget from '../../components/Widget';
import s from './Dashboard.scss';

class AgentDashboard extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    // isFetching: PropTypes.bool,
    // isAuthenticated: PropTypes.bool,
    // errorMessage: PropTypes.string,
    agentIds: PropTypes.array
  };

  static defaultProps = {
    agentIds: []
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { agentIds } = this.props;

    return (
      <div className={s.root}>
        <h1 className="page-title">Agent Dashboard <small><small>Performance</small></small></h1>
        <Row>
          <Col lg={6}>
            <Widget title={<h5>Example <span className="fw-semi-bold">Widget</span></h5>}>
              <div>
                {agentIds.join()}
                <p className="lead">
                  Howdy!
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
    isFetching: state.agents.isFetching,
    isAuthenticated: state.agents.isAuthenticated,
    errorMessage: state.agents.errorMessage,
    agentIds: state.agents.agentIds
  };
}

export default connect(mapStateToProps)(withStyles(s)(AgentDashboard));
