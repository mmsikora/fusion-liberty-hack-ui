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
            <Widget title={<h5><span className="fw-semi-bold">Welcome</span></h5>}>
              <div>
                <p className="lead">
                  You are looking at the spot where the Liberty Mutual
                  Agent Opportunity is going to very soon.
                  Built with <strong>React JS</strong> using
                  Redux, React Router and Server Side Rendering!
                </p>
                <p className="fs-mini text-right m-0">Made for the Agents of <a href="https://www.libertymutual.com" target="_blank" rel="noopener noreferrer">Liberty Mutual</a>.</p>
              </div>
            </Widget>
            <Widget title={<h5>Problem <span className="fw-semi-bold">Statement</span></h5>}>
              <div>
                <p className="lead">
                  This is where we state the problem.
                </p>
              </div>
            </Widget>
            <Widget title={<h5>Solution <span className="fw-semi-bold">Thesis</span></h5>}>
              <div>
                <p className="lead">
                  A statement of our hypothesis. Short abstract of proposed solution.
                </p>
              </div>
            </Widget>
            <Widget title={<h5>Technical <span className="fw-semi-bold">Solution</span></h5>}>
              <div>
                <p className="lead">
                  A statement on how we solved it
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
