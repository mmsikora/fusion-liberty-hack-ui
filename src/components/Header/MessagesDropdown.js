import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import {
  NavDropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu
} from 'reactstrap';

import s from './Header.scss';

import sender1 from '../../images/1.png';
import sender2 from '../../images/2.png';
import sender3 from '../../images/3.png';

class MessagesDropdown extends React.Component {

  constructor(props) {
    super(props);
    this.toggleMessagesDropdown = this.toggleMessagesDropdown.bind(this);

    this.state = {
      messagesOpen: false
    };
  }

  toggleMessagesDropdown() {
    this.setState({
      messagesOpen: !this.state.messagesOpen,
    });
  }

  render() {
    const { messagesOpen } = this.state;
    return (
      <NavDropdown isOpen={messagesOpen} toggle={this.toggleMessagesDropdown}>
        <DropdownToggle nav className={s.navItem}>
          <i className="glyphicon glyphicon-comments" />
        </DropdownToggle>
        <DropdownMenu className={`${s.dropdownMenu} ${s.messages}`}>
          <DropdownItem>
            <img className={s.image} src={sender1} alt="" />
            <div className={s.details}>
              <div>Jane Hew</div>
              <div className={s.text}>
                Hey, John! How is it going? ...
              </div>
            </div>
          </DropdownItem>
          <DropdownItem>
            <img className={s.image} src={sender2} alt="" />
            <div className={s.details}>
              <div>Alies Rumiancaŭ</div>
              <div className={s.text}>
                I will definitely NOT buy this template
              </div>
            </div>
          </DropdownItem>
          <DropdownItem>
            <img className={s.image} src={sender3} alt="" />
            <div className={s.details}>
              <div>Michał Rumiancaŭ</div>
              <div className={s.text}>
                Is it really Lore ipsum? Lore ...
              </div>
            </div>
          </DropdownItem>
          <DropdownItem>
            <a>
              See all messages <i className="fa fa-arrow-right" />
            </a>
          </DropdownItem>
        </DropdownMenu>
      </NavDropdown>
    );
  }
}

export default withStyles(s)(MessagesDropdown);
