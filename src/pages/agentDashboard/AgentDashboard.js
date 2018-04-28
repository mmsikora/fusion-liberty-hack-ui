import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import {
  Row, Col, Form, FormGroup, Label, Input, Button, Progress
} from 'reactstrap';
import $ from 'jquery';
/* eslint-disable */
import 'imports-loader?jQuery=jquery,this=>window!webpack-raphael/raphael';
import 'imports-loader?jQuery=jquery,this=>window!govpredict-morris/morris';
import 'imports-loader?jQuery=jquery,this=>window!flot';
import 'imports-loader?jQuery=jquery,this=>window!flot/jquery.flot.time';
import 'imports-loader?jQuery=jquery,this=>window!jquery.flot.animator/jquery.flot.animator';
import 'imports-loader?jQuery=jquery,this=>window!easy-pie-chart/dist/jquery.easypiechart.js';
import 'imports-loader?jQuery=jquery,this=>window!jquery-sparkline';
/* eslint-enable */

/** https://www.npmjs.com/package/format-number */
import format from 'format-number';

import Widget from '../../components/Widget';
import s from './Dashboard.scss';
// import s2 from '../statistics/charts/Charts.scss';

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
    this.initEasyPieChart = this.initEasyPieChart.bind(this);
    this.updateEasyPieChart = this.updateEasyPieChart.bind(this);

    this.state = {
      agentId: '',
      agent: {},
      errorMessage: ''
    };

  }

  componentDidMount() {
    this.initEasyPieChart();
    window.addEventListener('resize', this.onResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize);
  }

  componentDidUpdate() {
    this.updateEasyPieChart();
  }

  onResize() {
  }

  setAgentData() {
    const { agentId } = this.state;
    const { agents } = this.props;
    const agent = agentId ? agents[String(agentId)] : null;
    if (agent) {
      agent.totalNewPolicies = agent.states ?
        agent.states.reduce((total, state) => {
          return total + Number(state.amount);
        }, 0) : 0;

      agent.premiumsRatio = 100 * (agent.totalAgentPremium / agent.totalWrittenPremium);
      // console.log('setAgentData() - agent: ', agent);
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

  initEasyPieChart() {
    $(this.easyPieChart).easyPieChart({
      barColor: '#5dc4bf',
      trackColor: '#ddd',
      scaleColor: false,
      lineWidth: 10,
      size: 120,
    });
  }

  updateEasyPieChart() {
    const {agent} = this.state;
    const premiumRatio = agent.premiumsRatio || 0;
    // console.log('calling updateEasyPieChart! premiumRatio: ', premiumRatio);

    $(this.easyPieChart).data('easyPieChart').update(premiumRatio);
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
    const scaleValue = this.scaleProgress(value);
    if (scaleValue < 50) {
      return 'success';
    } else if (scaleValue < 75) {
      return 'warning';
    }
    return 'danger';
  }

  createTable(classCodes) {
    if(classCodes == null) {
      return '';
    }
    let table = []
    table.push(
      <FormGroup row>
        <Col md={3}>
          <strong>Amount</strong>
        </Col>
        <Col md={9}>
          <strong>Description</strong>
        </Col>
      </FormGroup>
    );
    // Outer loop to create parent
    for (let i = 0; i < classCodes.length; i++) {
      table.push(
        <FormGroup row>
          <Col md={3}>
            <Label className="col-form-label float-md-left">
              {classCodes[i].amount}
            </Label>
          </Col>
          <Col md={9}>
            {classCodes[i].classCdDesc}
          </Col>
        </FormGroup>
      );
    }
    return table;
  }

  render() {
    // const { agentIds } = this.props;
    // console.log(`all agent ids loaded: ${agentIds.join(', ')}`);
    const { agentId, agent } = this.state;

    const statsPremiumsRatio = agent.premiumsRatio ? String(Math.round(agent.premiumsRatio)) : '0';

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

              </Form>

            </Widget>
          </Col>
        </Row>

        <Row>
          <Col lg={6} xl={4} xs={12}>
            <Widget
              title={<h5> <span className="fw-semi-bold">Comparison</span></h5>}
              close collapse
            >
              <div className="clearfix">
                <h4 className="">Percentage of Total Premiums</h4>

                <div className="text-center">
                  <div ref={(r) => { this.easyPieChart = r; }} className="easy-pie-chart mb-lg" data-percent="0">{`${String(statsPremiumsRatio)}`} &#37;
                  </div>
                </div>
                { agent.totalAgentPremium &&
                  <p className="fs-mini text-muted">
                  TotalAgent ( {accountingFormat(agent.totalAgentPremium)}) vs Total Written Premiums ({accountingFormat(agent.totalWrittenPremium)})
                  </p>
                }
              </div>
            </Widget>
            </Col>
            <Col lg={4} md={12} xs={12}>
            <Widget
              title={<h5><i className="fa fa-arrow-right" /> Agent Exposure</h5 >} close collapse
            >
              <h5 className="mt-0 mb-xs font-weight-normal">Agent's Exposure: {agent.averageAgentExposure}</h5><br/>
              <Progress color={this.colorProgress(agent.averageAgentExposure)} value={this.scaleProgress(agent.averageAgentExposure)} className="progress-lg" />
              <h5 className="mt-0 mb-xs font-weight-normal">Aggregate Agents' Exposure: {agent.averageWrittenExposure}</h5><br/>
              <Progress color={this.colorProgress(agent.averageWrittenExposure)} value={this.scaleProgress(agent.averageWrittenExposure)} className="progress-lg" />
            </Widget>
          </Col>
        </Row>
        <Row>
          <Col lg={6} xl={6} xs={6}>
            <Widget
              title={<h5> <span className="fw-semi-bold">Policy Classes Written</span></h5>}
              close collapse
            >
              {this.createTable(agent.classCodes)} 
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
