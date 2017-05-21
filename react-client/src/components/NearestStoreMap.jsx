
import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {GridList, GridTile} from 'material-ui/GridList';
import GoogleMapReact from 'google-map-react';
import FlatButton from 'material-ui/FlatButton';
import injectTapEventPlugin from 'react-tap-event-plugin'; 


    // var initMap = () => {
    //   map = new google.maps.Map(this.refs.map.getDOMNode());
    // }

 class ClosestStore extends React.Component {
  constructor (props) {
    super(props);
    // this.testFunc = this.testFunc.bind(this)
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

  // update() {
  //   this.setState({
  //     lat: this.props.state.homeAddressLat,
  //     lng: this.props.state.homeAddressLng
  //   })
  // }

  // shouldComponentUpdate () {if () {return true;}}

  // shouldComponentUpdate(nextProps, nextState) {
  //   return (nextprops.cardDetails != this.props.cardDetails);
  // }

  // testFunc (e) {
  //   e.preventDefault();
  //   this.render();
  // }

  render() {

    const styles = {
      div: {
        display: 'block',
      },
      card: {
        width: 500,
        height: 550
      },
      cardHeader: {
        height: 50,
        margin: 0,
        align: 'center'
      },
      center: {
        lat: parseFloat(this.props.state.homeAddressLat),
        lng: parseFloat(this.props.state.homeAddressLng)
      },
      map: {
        height: 350,
        width: 500,
        marginBottom: 10
      },
      coordinates: {
        height: 35,
        marginLeft: 20,
        marginBottom: 0
      },
      button: {
        width: 30,
        height: 30
      }
    }

    return (
      <div style={styles.div}>
        <Card style={styles.card}>
          <CardHeader style={{ marginLeft: 20, marginBottom: 0 }} title='All of Your Ingredients Are "Right Around the Corner"™'/>
            <div style={{ marginTop: 0 }} style={styles.map} >
              <GoogleMapReact
                bootstrapURLKeys={{ key: 'AIzaSyBD5VDZHAMghzun891D2rAZCOgKo7xM6Wc' }}
                center={styles.center}
                zoom={18}>
              </GoogleMapReact>
            </div>
          <form>
            <TextField style={styles.coordinates} type="text" hintText="Home Address" name="lng" onChange={ e => this.props.changeProp('homeAddressWords', e.target.value)}></TextField>
            <FlatButton style={styles.button} type="button" label="Submit" onClick={this.props.handleChangeAddress}></FlatButton>
          </form>
        </Card>
      </div>
    )
  }
}

export default ClosestStore;
          // <TextField style={{ marginLeft: 50 }} hintText="Address" />
            // <TextField style={styles.coordinates} type="text" hintText="Latitude" name="lat" value={this.props.state.homeAddressLat} onChange={this.props.handleChangeLat}></TextField>
            // <TextField style={styles.coordinates} type="text" hintText="Longitude" name="lng" value={this.props.state.homeAddressLng} onChange={this.props.handleChangeLng}></TextField>
