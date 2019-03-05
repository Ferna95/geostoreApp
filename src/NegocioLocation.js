import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  View,
  Image,
} from 'react-native';
import { Text} from 'native-base';
import MapView from "react-native-maps";


export class NegocioLocation extends React.Component {

  constructor(props) {
    super(props);
  }



  componentDidMount(){

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
         />
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