import React, {Component} from 'react';
import {NavDropdown, MenuItem, Glyphicon, Badge} from 'react-bootstrap';

class Notifications extends Component {

  componentDidMount() {
    // this.checkNotifs();
  }
  checkNotifs() {
    // this.props.checkNotification(this.props.id_user);
    // setTimeout(() => { this.checkNotifs(); }, 60000);
  }

  render() {
    return (
      <NavDropdown
        title={<span><Glyphicon glyph="bell" /><Badge>{this.props.notifications.length}</Badge></span>}
        key='notifs'
        id='dropdown-basic-0'
      >{this.props.notifications.map((notif)=><MenuItem componentClass='span' eventKey={JSON.stringify(notif)} key={JSON.stringify(notif)}>{JSON.stringify(notif)}</MenuItem>)}
      </NavDropdown>
    );
  }
}

export default Notifications;
