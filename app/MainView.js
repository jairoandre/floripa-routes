import React, {Component, PropTypes} from 'react';
import {searchRoutesByTerm, searchStopsByRouteId, searchDeparturesByRouteId} from './Api';
import RouteView from './components/material/RouteView';
import DetailView from './components/material/DetailView';
import HeaderView from './components/material/HeaderView';
import Loading from './components/material/Loading';

export default class MainView extends Component {

  constructor(props) {
    super(props);
    // Initial state
    this.state = {
      term: '',
      routes: [],
      stops: [],
      departures: [],
      loading: false,
      searched: false,
      detailView: false,
      url: '',
      routeId: ''
    };
  }

  render() {

    /**
     * Shortcut to this.setState
     *
     * @param newState
     * @private
     */
    const _setState = (newState) => {
      this.setState({...this.state, ...newState});
    };

    /**
     * Set state to search routes by term
     *
     */
    const searchRoutes = (term) => {
      _setState({routes: [], term: term, loading: true, searched: false})
      searchRoutesByTerm(term).then(
        (resp) => {
          _setState({loading: false});
          let parsedResp = JSON.parse(resp);
          setTimeout(() => {
            _setState({routes: parsedResp.rows, searched: true});
          }, 300);
        },
        (reason) => {
          console.error('Ops! Something went wrong', reason)
          _setState({loading: false});
        }
      );
    }

    /**
     * Set state to detail a route
     *
     * @param routeId
     */
    const detailRoute = (routeId) => {
      _setState({stops: [], departures: [], loading: true, detailView: true});
      Promise.all([searchStopsByRouteId(routeId), searchDeparturesByRouteId(routeId)]).then(
        (resp) => {
          _setState({loading: false});
          let parsedResp = [JSON.parse(resp[0]), JSON.parse(resp[1])];
          setTimeout(() => {
            _setState({stops: parsedResp[0].rows, departures: parsedResp[1].rows});
          }, 300);
        },
        (reason) => {
          console.error('Ops! Something went wrong', reason)
          _setState({loading: false});
        }
      );
    }


    /**
     * Handle action to search button
     */
    const handleSearch = (term) => {
      searchRoutes(term);
    }

    /**
     * Handle action to detail item
     *
     * @param id
     */
    const handleDetail = (id) => {
      _setState({detailView: true, routeId: id});
      detailRoute(id);
    }

    /**
     *
     */
    const back = () => {
      _setState({detailView: false});
    }

    return (
    	<div>
        <Loading
          show={this.state.loading}/>
        <HeaderView
          detailView={this.state.detailView}
          handleBack={back}/>
        <RouteView
          routes={this.state.routes}
          handleBack={back}
          handleSearch={handleSearch}
          handleDetail={handleDetail}
          term={this.state.term}
          searched={this.state.searched}
          show={!this.state.detailView}/>
        <DetailView
          stops={this.state.stops}
          departures={this.state.departures}
          handleBack={back}
          show={this.state.detailView}/>
      </div>
    );
  }
}