import React from 'react';
import { UncontrolledAlert } from 'reactstrap';

import s from './Header.scss';

function HeaderAlert() {
  return (
    <UncontrolledAlert className={`${s.alert} d-md-none-down ml-auto mr-3`}>
      <i className="fa fa-info-circle mr-1" /> Notice: Q1 numbers just released!
    </UncontrolledAlert>
  );
}

export default HeaderAlert;
