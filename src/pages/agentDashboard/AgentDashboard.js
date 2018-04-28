import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import {
  Row, Col, Form, FormGroup, Label, Input, ButtonToolbar, Button, Progress
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

  scaleProgress(value) {
    if (value == null) {
      return 0;
    }
    return (value * 10) % 100;
  }

  colorProgress(value) {
    let scaleValue = this.scaleProgress(value);
    if (scaleValue < 50) {
      return 'success';
    } else if (scaleValue < 75) {
      return 'warning';
    } 
    return 'danger';
  }

  render() {
    const { agentIds } = this.props;
    console.log(`all agent ids loaded: ${agentIds.join(', ')}`);
    // const agent = agents[String(agentIds[0])];

    const { agentId, agent } = this.state;

    return (
      <div className={s.root}>
        <h1 className="page-title">Agent</h1>
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
                  <Col md={9}>
                    <Input type="text" name="agentId" id="agentId" value={agentId} className="input-transparent" onChange={this.handleChange} />
                  </Col>
                </FormGroup>
                <div className="form-actions">
                  <ButtonToolbar className="justify-content-md-center">
                    <Button type="submit" color="success">Submit</Button>
                    <Button type="button" color="secondary" onClick={this.handleCancel}>Cancel</Button>
                  </ButtonToolbar>
                </div>
              </Form>
            </Widget>
            <Widget title={<h5>Agent <span className="fw-semi-bold">Data</span></h5>}>
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
                      Total Agent Premium
                    </Label>
                  </Col>
                  <Col md={9}>
                    <Input type="text" name="totalAgentPremium" id="totalAgentPremium" value={accountingFormat(agent.totalAgentPremium)} className="input-transparent" />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md={3}>
                    <Label htmlFor="totalWrittenPremium" className="col-form-label float-md-left">
                      Total Written Premium
                    </Label>
                  </Col>
                  <Col md={9}>
                    <Input type="text" name="totalWrittenPremium" id="totalWrittenPremium" value={accountingFormat(agent.totalWrittenPremium)} className="input-transparent" />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md={3}>
                    <Label htmlFor="totalAgentCommission" className="col-form-label float-md-left">
                      Total Agent Commission
                    </Label>
                  </Col>
                  <Col md={9}>
                    <Input type="text" name="totalAgentCommission" id="totalAgentCommission" value={accountingFormat(agent.totalAgentCommission)} className="input-transparent" />
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Col md={3}>
                    <Label htmlFor="totalWrittenCommission" className="col-form-label float-md-left">
                      Total Written Commission
                    </Label>
                  </Col>
                  <Col md={9}>
                    <Input type="text" name="totalWrittenCommission" id="totalWrittenCommission" value={accountingFormat(agent.totalWrittenCommission)} className="input-transparent" />
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Col md={3}>
                    <Label htmlFor="averageAgentCommission" className="col-form-label float-md-left">
                      Average Agent Commission
                    </Label>
                  </Col>
                  <Col md={9}>
                    <Input type="text" name="averageAgentCommission" id="averageAgentCommission" value={accountingFormat(agent.averageAgentCommission)} className="input-transparent" />
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Col md={3}>
                    <Label htmlFor="averageWrittenCommission" className="col-form-label float-md-left">
                      Average Written Commission
                    </Label>
                  </Col>
                  <Col md={9}>
                    <Input type="text" name="averageWrittenCommission" id="averageWrittenCommission" value={accountingFormat(agent.averageWrittenCommission)} className="input-transparent" />
                  </Col>
                </FormGroup>
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
        <Row>
          <Col lg={4} md={12} xs={12}>
            <Widget
              title={<h5><i className="fa fa-arrow-right" /> Agent Exposure</h5>}
            >
              <h5 className="mt-0 mb-xs font-weight-normal">Agent's Exposure: {agent.averageAgentExposure}</h5><br/>
              <Progress color={this.colorProgress(agent.averageAgentExposure)} value={this.scaleProgress(agent.averageAgentExposure)} className="progress-lg" />
              <h5 className="mt-0 mb-xs font-weight-normal">Aggregate Agents' Exposure: {agent.averageWrittenExposure}</h5><br/>
              <Progress color={this.colorProgress(agent.averageWrittenExposure)} value={this.scaleProgress(agent.averageWrittenExposure)} className="progress-lg" />
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
