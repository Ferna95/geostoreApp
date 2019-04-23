import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  View,
  ActivityIndicator,
  Image,
} from 'react-native';

import Global from './../common/Global';
import { Text, Icon,Container,Content} from 'native-base';
import MapView from "react-native-maps";
import {HeaderGeostore} from '.././common/HeaderGeostore';

export class Explorar extends React.Component {

  static navigationOptions = {
    headerTitle: <HeaderGeostore style={{width: 100}} name="EXPLORAR" />,
  };

  constructor(props) {
    super(props);
    this.state = {
      latitude: 0,
      longitude: 0,
      error: null,
      companies: [],
      activity: false,
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
        console.log(position);
      },
      (error) => this.setState({ error: error.message })
    );

    this.getCompanies();
  }

  getCompanies(){
    
    this.setState({activity: true});
    fetch(Global.CONFIGURATION.BASEPATH + 'api/v1/negocios_explorar?_format=json' + '&rand=' + new Date().getTime())
     .then(response => response.json()) 
     .then((responseData) => { 
       this.setState({companies: responseData,activity: false})
     })
     .catch((err) => { 
       console.error(err); 
     });
  }

  render() {
    return (
      <Container>
        <Content contentContainerStyle={{ justifyContent: 'center', flex: 1, paddingHorizontal: 10, backgroundColor: Global.COLORS.ZERO }}>
          {
            this.state.activity ? 
            (
              <View style={[styles.container, styles.horizontal]}>
                <ActivityIndicator size="large" color={Global.COLORS.ONE} />
              </View>
            )
            :
            (
              <MapView
                style={styles.map}
                initialRegion={{ // initial region set to Bileto
                    latitude: this.state.latitude,
                    longitude: this.state.longitude,
                    latitudeDelta: 0,
                    longitudeDelta: 0.0421
                }}
              >
                <MapView.Marker
                  coordinate={{latitude: this.state.latitude,
                  longitude: this.state.longitude}}
                  title='Posición actual'
                  description='Usted se encuentra aquí'
                 >
                </MapView.Marker>
                { 
                  this.state.companies.map((prop, key) => {
                    return (
                      <MapView.Marker
                        coordinate={{latitude: parseFloat(prop.field_latitud),
                        longitude: parseFloat(prop.field_longitud)}}
                        title={prop.title}
                        description={prop.field_direccion}
                        key={key}
                        onCalloutPress={() => this.props.navigation.navigate('Negocio',{company_nid: prop.nid})}
                       >
                       <Icon name="ios-pin" style={{color:'#0000FF', fontSize: 40}}/>
                      </MapView.Marker>
                    );
                  })
                }
              </MapView>
            )
          }
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F5FCFF"
    },
    map: {
        flex: 1,
    }
});