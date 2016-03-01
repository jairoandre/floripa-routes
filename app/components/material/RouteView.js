import React, {Component, PropTypes} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';
import RaisedButton from 'material-ui/lib/raised-button';
import TextField from 'material-ui/lib/text-field';
import SearchMap from '../common/SearchMap';


export default class RouteView extends Component {

  constructor (props) {
    super(props);
    this.state = {tab: 'byName'};
  }

  _setState (newState) {
    this.setState({...this.state, ...newState});
  }

  handleSearchForMap (term) {
    this._setState({tab: "byName"});
    this.props.handleSearch(term);
  }

  listView () {
      const styles = require('../../main.css');
      if (this.props.routes.length > 0) {
        return (
          <List subheader={'RESULTS FOR "' + this.props.term.toUpperCase() + '"'} className={styles.marginTop}>
            {this.props.routes.map((item, idx) => {
              return (
                <ListItem key={idx} primaryText={item.longName} onClick={() => {this.props.handleDetail(item.id)}}/>);
            })}
          </List>
        );
      } else if (this.props.searched) {
        return (<List subheader={'NO RESULTS FOR "' + this.props.term.toUpperCase() + '"'} className={styles.marginTop}/>);
      }
  }    

  renderContent () {
      if (this.props.show) {
        return (
          <Tabs value={this.state.tab} onChange={(value) => {if (value === 'byName' || value === 'pickMap') this._setState({tab: value});}}>
              <Tab label="By name" value="byName">
                <div style={{margin: '0 10px'}}>
                  <TextField
                    ref="searchInput"
                    fullWidth
                    floatingLabelText="WHERE?"
                    onChange={(event) => { this.refs.searchInput = event.target.value }}/>
                  <RaisedButton
                    onClick={() => {this.props.handleSearch(this.refs.searchInput)}}
                    secondary
                    label="SEARCH"/>
                </div>
                <ReactCSSTransitionGroup
                  transitionName="show"
                  transitionEnterTimeout={300}
                  transitionLeaveTimeout={250}>
                  {this.listView()}
                </ReactCSSTransitionGroup>
              </Tab>
              <Tab label="Pick on map" value="pickMap">
                <SearchMap lat={-27.596650} lng={-48.559747} handleSearchForMap={this.handleSearchForMap}/>
              </Tab>
            </Tabs>
        );
      } else {
        return (<div/>);
      }
    }

  render() {
    return <div>{this.renderContent()}</div>;
  }

}