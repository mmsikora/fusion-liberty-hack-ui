import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import {
  InputGroupAddon,
  InputGroup,
  Input,
  Collapse
} from 'reactstrap';

import s from './Header.scss';

class SearchBar extends React.Component {
  static propTypes = {
    searchOpen: PropTypes.bool.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      searchFocused: false
    };
  }

  render() {
    const { searchOpen } = this.props;
    const { searchFocused } = this.state;
    return (
      <Collapse className={`${s.searchCollapse} ml-auto ml-lg-0 mr-md-3`} isOpen={searchOpen}>
        <InputGroup className={`${s.navbarForm} ${searchFocused ? s.navbarFormFocused : ''}`}>
          <InputGroupAddon className={s.inputAddon}><i className="fa fa-search" /></InputGroupAddon>
          <Input
            id="search-input" placeholder="Search..." className="input-transparent"
            onFocus={() => this.setState({ searchFocused: true })}
            onBlur={() => this.setState({ searchFocused: false })}
          />
        </InputGroup>
      </Collapse>
    );
  }
}

export default withStyles(s)(SearchBar);
