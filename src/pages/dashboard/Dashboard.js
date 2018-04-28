import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Row, Col } from 'reactstrap';

import Widget from '../../components/Widget';
import s from './Dashboard.scss';

class Dashboard extends React.Component {
  render() {
    return (
      <div className={s.root}>
        <h1 className="page-title">Agent <strong>Opportunity</strong></h1>
        <Row>
          <Col lg={8}>
            <Widget title={<h2><span className="fw-semi-bold">Welcome</span></h2>}>
              <div>
                <p className="lead">
                  The Liberty Mutual Agent Opportunity provides insight into <strong>Split Rated Business Owners Policy</strong> (SRB).
                  <br/> <br/>
                  Built with <strong>React JS</strong> using
                  Redux, React Router and Server Side Rendering with Neo4j Graph Database!
                </p>
                <p className="fs-mini text-right m-0">Made for the Agents of <a href="https://www.libertymutual.com" target="_blank" rel="noopener noreferrer">Liberty Mutual</a>.</p>
              </div>
            </Widget>
            <Widget title={<h3>Problem <span className="fw-semi-bold">Statement</span></h3>}>
              <div>
                <p className="lead">
                  Competitive Dashboard or Prospecting Tools for Agents
                   <br/><br/>
                   Give agents a view into how they are performing at selling Split Rated Business Owner Policy (SRB) policies vs their peers,
                   and give the business insight into performance and the classes of insurance being sold in the market.
                </p>
              </div>
            </Widget>
            <Widget title={<h3>Solution <span className="fw-semi-bold">Thesis</span></h3>}>
              <div>
                <p className="lead">
                Build a view into Policy SRB data that is agent focused and provide them with a rich and elegant experience.
                </p>
              </div>
            </Widget>
            <Widget title={<h3>Technical <span className="fw-semi-bold">Solution</span></h3>}>
              <div>
                <p className="lead">
                Create an React UI application that has charts and graphs to visually represent Agent data, using actual datasets (Development) served from a graph database housing ACORD XML.
                </p>

                <p className="fs-mini lead">
                  Links
                </p>
                <ul>
                  <li><a href="https://github.com/mmsikora/fusion-liberty-hack-spring-boot" target="_blank" rel="noopener noreferrer"> Server Repo </a></li>
                  <li><a href="https://github.com/mmsikora/fusion-liberty-hack-ui" target="_blank" rel="noopener noreferrer"> Client Repo </a></li>
                </ul>
              </div>
            </Widget>
          </Col>
        </Row>
      </div>
    );
  }
}

export default (withStyles(s)(Dashboard));
