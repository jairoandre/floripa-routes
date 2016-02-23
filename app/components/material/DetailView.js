import React, {Component, PropTypes} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';
import RaisedButton from 'material-ui/lib/raised-button';


export default class DetailView extends Component {

  constructor(props){
    super(props)
  }

  render(){
    const styles = require('../../main.css');

    const renderContent = () => {
      if(this.props.show){
        return (
          <div>
            <Tabs>
              <Tab label="Stops">
                <List className={styles.marginTop} striped>
                  <ReactCSSTransitionGroup
                    transitionName="show"
                    transitionEnterTimeout={300}
                    transitionLeaveTimeout={250}>
                    {this.props.stops.map((item, idx) => {
                      return (
                        <ListItem key={idx} primaryText={item.name} secondaryText={item.sequence}/>);
                    })}
                  </ReactCSSTransitionGroup>
                </List>
              </Tab>
              <Tab label="Departures">
                <List subheader="DEPARTURES" className={styles.marginTop}>
                  {this.props.departures.map((item, idx) => {
                    return (
                      <ListItem key={idx} primaryText={item.time}/>);
                  })}
                </List>
              </Tab>
            </Tabs>

            <div>
              <RaisedButton onClick={this.props.handleBack} label="BACK" secondary={true} style={{margin: '5px'}}/>
            </div>
          </div>
        );
      }else{
        return <div/>;
      }
    }

    return renderContent();
  }

}