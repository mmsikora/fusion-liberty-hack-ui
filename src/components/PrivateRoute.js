import React from 'react';
import { Route, Redirect } from 'react-router';

// let isAuthenticated = function() {
//   let t = jwt.verify(cookie.load('id_token'), auth.jwt.secret);
//   console.log(t);
//   return true;
// };

export default ({ component, isAuthenticated, ...rest }) => ( // eslint-disable-line
  <Route
    {...rest} render={props => (
    isAuthenticated ? (
      React.createElement(component, props)
    ) : (
      <Redirect
        to={{
          pathname: '/login',
          state: { from: props.location }, // eslint-disable-line
        }}
      />
    )
  )}
  />
);