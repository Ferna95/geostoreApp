import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  View,
  Image,
} from 'react-native';
import { Text, Icon} from 'native-base';
import MapView from "react-native-maps";

export class NegocioLocation extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      latitude: 0,
      longitude: 0,
      error: null,
    };
  }



  componentDidMount(){
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        });
      },
      (error) => this.setState({ error: error.message })
    );
  }


  render() {
    var markers = [
      {
        latitude: parseFloat(this.props.company[0].field_latitud),
        longitude: parseFloat(this.props.company[0].field_longitud),
        title: 'Foo Place',
        subtitle: '1234 Foo Drive'
      }
    ];
    return (
      <MapView
        style={styles.map}
        annotations={markers}
        initialRegion={{ // initial region set to Bileto
            latitude: parseFloat(this.props.company[0].field_latitud),
            longitude: parseFloat(this.props.company[0].field_longitud),
            latitudeDelta: 0,
            longitudeDelta: 0.0421
        }}
      >
        <MapView.Marker
            coordinate={{latitude: parseFloat(this.props.company[0].field_latitud),
            longitude: parseFloat(this.props.company[0].field_longitud)}}
            title={this.props.company[0].title}
            description={this.props.company[0].field_direccion}
         >
          <Icon name="ios-pin" style={{color:'#0000FF', fontSize: 40}}/>
         </MapView.Marker>
         <MapView.Marker
            coordinate={{latitude: this.state.latitude,
            longitude: this.state.longitude}}
            title='Posición actual'
            description='Usted se encuentra aquí'
         >
         </MapView.Marker>
      </MapView>
     );
   }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F5FCFF"
    },
    map: {
        height: 400,
    }
});