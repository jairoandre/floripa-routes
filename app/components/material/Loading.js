import React, {Component, PropTypes} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import RefreshIndicator from 'material-ui/lib/refresh-indicator';

export default class Loading extends Component {

  constructor(props) {
    super(props);
  }

  render() {

    const renderContent = () => {
      if (this.props.show) {
        return (
          <div style={{position: 'absolute', left: (window.innerWidth/2 - 25), top: (window.innerHeight/2 - 25)}}>
            <RefreshIndicator
              key='loading'
              size={50}
              left={0}
              top={0}
              status='loading'/>
          </div>
        );
      } else {
        return '';
      }
    }

    return (
      <ReactCSSTransitionGroup
        transitionName="loading"
        transitionEnterTimeout={300}
        transitionLeaveTimeout={250}>
        {renderContent()}
      </ReactCSSTransitionGroup>
    );
  }
}