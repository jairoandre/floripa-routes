import React, {Component, PropTypes} from 'react';
import AppBar from 'material-ui/lib/app-bar';
import FlatButton from 'material-ui/lib/flat-button';

export default class HeaderView extends Component {
  render() {
    return (
      <AppBar
        title="Floripa Routes"
        showMenuIconButton={false}
        iconElementRight={this.props.detailView ? <FlatButton label="Back" onClick={this.props.handleBack} /> : <div/>}/>
    );
  }
}