import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Row, Col } from 'reactstrap';

import Widget from '../../components/Widget';
import s from './Dashboard.scss';

class Dashboard extends React.Component {
  render() {
    return (
      <div className={s.root}>
        <h1 className="page-title">Dashboard <small><small>Agents</small></small></h1>
        <Row>
          <Col lg={6}>
            <Widget title={<h5>Example <span className="fw-semi-bold">Widget</span></h5>}>
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
          </Col>
        </Row>
      </div>
    );
  }
}

export default (withStyles(s)(Dashboard));
