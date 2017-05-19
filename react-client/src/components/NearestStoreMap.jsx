
import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {GridList, GridTile} from 'material-ui/GridList';
import GoogleMapReact from 'google-map-react';
import FlatButton from 'material-ui/FlatButton';

    // var initMap = () => {
    //   map = new google.maps.Map(this.refs.map.getDOMNode());
    // }

 class ClosestStore extends React.Component {
  constructor (props) {
    super(props);
  }


  // componentDidMount () {
  //   // Connect the initMap() function within this class to the global window context,
  //   var loadJS = (src) => {
  //     var ref = window.document.getElementsByTagName("script")[0];
  //     var script = window.document.createElement("script");
  //     script.src = src;
  //     script.async = true;
  //     ref.parentNode.insertBefore(script, ref);
  //   }
  //   // so Google Maps can invoke it
  //   // window.initMap = this.initMap;
  //   // Asynchronously load the Google Maps script, passing in the callback reference
  //   loadJS('https://maps.googleapis.com/maps/api/js?key=AIzaSyBD5VDZHAMghzun891D2rAZCOgKo7xM6Wc&callback=initMap')
  // }  

  render() {
    const styles = {
      div: {
        display: 'block'
      },
      card: {
        width: 400,
        height: 400
      },
      cardHeader: {
        height: 60,
      },
      center: {
        lat: this.props.homeAddressLat,
        lng: this.props.homeAddressLng
      },
      map: {
        height: 300,
        width: 300
      },
      actions: {
        height: 40
      }
    }

    return (
      <div style={styles.div}>
        <Card style={styles.card}>
          <CardHeader title="Closest Grocery Store with Your Ingredients."/>
          <form handleSubmit={this.render}>
            <input id="latit" type="text" name="lat" value={styles.center.lat} onChange={this.props.handleChange}></input>
            <input id="long" type="text" name="lng" value={styles.center.lng} onChange={this.props.handleChange}></input>
            <input type="submit" value="Submit"></input>
          </form>
          <TextField hintText="Address" onTouchTap={this.props.changeHomeAddress}/>
            <div style={styles.map}>
              <GoogleMapReact
                bootstrapURLKeys={{ key: 'AIzaSyBD5VDZHAMghzun891D2rAZCOgKo7xM6Wc' }}
                center={styles.center}
                zoom={13}>
              </GoogleMapReact>
            </div>
            <CardActions style={styles.actions}>
              <FlatButton primary = {true} label="Nav" />
            </CardActions>
        </Card>
      </div>
    )
  }
}

export default ClosestStore;