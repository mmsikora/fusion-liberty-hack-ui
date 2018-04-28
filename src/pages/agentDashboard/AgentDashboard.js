import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import {
  Row, Col, Form, FormGroup, Label, Input, ButtonToolbar, Button
} from 'reactstrap';

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


  constructor(props) {
    super(props);

    this.setAgentData = this.setAgentData.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);

    this.state = {
      agentId: '',
      agent: {},
      errorMessage: ''
    };

  }

  setAgentData() {
    const { agentId } = this.state;
    const { agents } = this.props;
    const agent = agents[String(agentId)];
    if (agent) {
      agent.totalNewPolicies = agent.states ?
        agent.states.reduce((total, state) => {
          return total + Number(state.amount);
        }, 0) : 0;

      this.setState({
        agent,
        errorMessage: ''
      });

    } else {
      this.setState({
        agent: {},
        errorMessage: 'hmm. Agent not found'
      });
    }
  }

  handleChange(event) {
    this.setState({ agentId: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setAgentData();
  }

  handleCancel(event) {
    event.preventDefault();
    this.setState({
      agentId: '',
      agent: {},
      errorMessage: ''
    });
  }

  render() {
    // const { agentIds } = this.props;
    // console.log(`all agent ids loaded: ${agentIds.join(', ')}`);
    const { agentId, agent } = this.state;

    return (
      <div className={`${s.root}`}>
        <h1 className="page-title">Agent <strong>Portal</strong></h1>
        <Row>
          <Col lg={8}>
            <Widget>
              <Form onSubmit={this.handleSubmit}>
                <FormGroup row>
                  <Col md={3}>
                    <Label htmlFor="agentId" className="col-form-label float-md-left">
                      Enter Your Agent ID
                    </Label>
                  </Col>
                  <Col md={5}>
                    <Input type="text" name="agentId" id="agentId" value={agentId} className="input-transparent" onChange={this.handleChange} />
                  </Col>
                  <Col md={4}>
                    <Button type="submit" color="success">Submit</Button>
                    <Button type="button" color="secondary" onClick={this.handleCancel}>Clear</Button>
                  </Col>
                </FormGroup>
              </Form>
            </Widget>


            <Widget title={<h5><span className="fw-semi-bold">Overview</span></h5>}>

              <Row>
                <Col lg={6} md={6} sm={6}>
                  <div className="box">
                    {agent.totalNewPolicies &&
                      <div className="description">
                        <i className="fa fa-briefcase" />&nbsp;
                        <strong>{agent.totalNewPolicies}</strong> new business policies
                      </div>
                    }
                  </div>
                </Col>

                <Col lg={6} md={6} sm={6}>
                  <div className="box">
                    {agent.averageAgentExposure &&
                      <div className="description">
                        <i className="fa fa-fire" />&nbsp;
                        <strong> {agent.averageAgentExposure}</strong> Average Exposure
                    </div>
                    }
                  </div>
                </Col>
              </Row>

              <br />

              <Form >
                <FormGroup row>
                  <Col md={3}>
                    <Label htmlFor="niprId" className="col-form-label float-md-left">
                      Agent ID
                    </Label>
                  </Col>
                  <Col md={9}>
                    <Input type="text" name="niprId" id="niprId" value={agent.niprId} className="input-transparent" />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md={3}>
                    <Label htmlFor="totalAgentPremium" className="col-form-label float-md-left">
                      Total Premium
                    </Label>
                  </Col>
                  <Col md={9}>
                    <Input type="text" name="totalAgentPremium" id="totalAgentPremium" value={accountingFormat(agent.totalAgentPremium)} className="input-transparent" />
                  </Col>
                </FormGroup>
                {/* <FormGroup row>
                  <Col md={3}>
                    <Label htmlFor="totalWrittenPremium" className="col-form-label float-md-left">
                      Total Written Premium
                    </Label>
                  </Col>
                  <Col md={9}>
                    <Input type="text" name="totalWrittenPremium" id="totalWrittenPremium" value={accountingFormat(agent.totalWrittenPremium)} className="input-transparent" />
                  </Col>
                </FormGroup> */}
                <FormGroup row>
                  <Col md={3}>
                    <Label htmlFor="totalAgentCommission" className="col-form-label float-md-left">
                      Total Commission
                    </Label>
                  </Col>
                  <Col md={9}>
                    <Input type="text" name="totalAgentCommission" id="totalAgentCommission" value={accountingFormat(agent.totalAgentCommission)} className="input-transparent" />
                  </Col>
                </FormGroup>

                {/* <FormGroup row>
                  <Col md={3}>
                    <Label htmlFor="totalWrittenCommission" className="col-form-label float-md-left">
                      Total Written Commission
                    </Label>
                  </Col>
                  <Col md={9}>
                    <Input type="text" name="totalWrittenCommission" id="totalWrittenCommission" value={accountingFormat(agent.totalWrittenCommission)} className="input-transparent" />
                  </Col>
                </FormGroup> */}

                <FormGroup row>
                  <Col md={3}>
                    <Label htmlFor="averageAgentCommission" className="col-form-label float-md-left">
                      Average Commission
                    </Label>
                  </Col>
                  <Col md={9}>
                    <Input type="text" name="averageAgentCommission" id="averageAgentCommission" value={accountingFormat(agent.averageAgentCommission)} className="input-transparent" />
                  </Col>
                </FormGroup>

                {/* <FormGroup row>
                  <Col md={3}>
                    <Label htmlFor="averageWrittenCommission" className="col-form-label float-md-left">
                      Average Written Commission
                    </Label>
                  </Col>
                  <Col md={9}>
                    <Input type="text" name="averageWrittenCommission" id="averageWrittenCommission" value={accountingFormat(agent.averageWrittenCommission)} className="input-transparent" />
                  </Col>
                </FormGroup> */}

                {/* <FormGroup row>
                  <Col md={3}>
                    <Label htmlFor="averageAgentExposure" className="col-form-label float-md-left">
                      Average Exposure
                    </Label>
                  </Col>
                  <Col md={9}>
                    <Input type="text" name="averageAgentExposure" id="averageAgentExposure" value={agent.averageAgentExposure} className="input-transparent" />
                  </Col>
                </FormGroup> */}

                {/* <FormGroup row>
                  <Col md={3}>
                    <Label htmlFor="averageWrittenExposure" className="col-form-label float-md-left">
                      Average Written Exposure
                    </Label>
                  </Col>
                  <Col md={9}>
                    <Input type="text" name="averageWrittenExposure" id="averageWrittenExposure" value={agent.averageWrittenExposure} className="input-transparent" />
                  </Col>
                </FormGroup> */}
              </Form>

              {/* <div>
                <p className="lead">
                  Id:  <strong>{ agent.niprId }</strong> <br />
                  Total Agent Premium: <strong>{ }</strong> <br />
                </p>
              </div> */}

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
