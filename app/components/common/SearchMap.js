import React, {Component, PropTypes} from 'react';
import {Gmaps, Marker, InfoWindow, Circle} from 'react-gmaps';
import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';

export default class SearchMap extends Component {

  constructor(props) {
    console.log('Searchmap constructed');
    super(props);
    this.state = {geocoder: null, open: false, place: '', lat: '', lng: ''};
  }

  componentDidMount() {
    this.setState({...this.state, lat: this.props.lat, lng: this.props.lng});
  }

  render() {

    const {handleSearchForMap} = this.props;

    /**
     * Shortcut to this.setState
     *
     * @param newState
     * @private
     */
    const _setState = (newState) => {
      this.setState({...this.state, ...newState});
    };

    const handleOk = () => {
      _setState({open: false});
      handleSearchForMap(this.state.place);
    };

    const handleClose = () => {
      _setState({open: false});
    };


    const onMapCreated = (map) => {
      console.log('Map created');
      if (window.google && !this.state.geocoder) {
        _setState({geocoder: new google.maps.Geocoder()})
      }
      map.setOptions({disableDefaultUI: true});
    }

    const onDragEnd = (e) => {

      if (this.state.geocoder) {
        this.state.geocoder.geocode({latLng: e.latLng}, function (results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
            _setState({open: true, lat: e.latLng.lat(), lng: e.latLng.lng(), place: results[0].address_components[1]['long_name']});
            // handleSearchForMap(e.latLng.lat(), e.latLng.lng(), results[0].address_components[1]['long_name']);
          } else {
            console.log("Geocode was not successful for the following reason: " + status);
          }
        });

      }
    }
    

    const actions = [
      <FlatButton
        label="Cancel"
        secondary
        onTouchTap={handleClose}
      />,
      <FlatButton
        label="OK"
        primary
        keyboardFocused={true}
        onTouchTap={handleOk}
      />,
    ];

    return (
      <div style={{height: (window.innerHeight - 112) + 'px'}}>
        <Dialog
          title={'Search routes for "' + this.state.place + '"?'}
          actions={actions}
          modal
          open={this.state.open}
          onRequestClose={handleClose}/>
        <Gmaps
          width={'100%'}
          height={'100%'}
          lat={this.state.lat}
          lng={this.state.lng}
          zoom={14}
          loadingMessage={'Loading...'}
          params={{v: '3.exp'}}
          onMapCreated={onMapCreated}>
          <Marker
            lat={this.state.lat}
            lng={this.state.lng}
            draggable={true}
            onDragEnd={onDragEnd}/>
        </Gmaps>
      </div>
    );
  }

}