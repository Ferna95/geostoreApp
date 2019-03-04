import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';


export class Negocios extends React.Component {

  componentDidMount(){

   fetch('http://192.168.0.10:8080/geostore_testing/mis-informes/ajax/get_busquedas_negocio', {
     method: 'POST',
     headers: {
       Accept: 'application/json',
       'Content-Type': 'application/json',
     },
     body: JSON.stringify({
       periodoNegocio: 'yourValue',
       nid: 'yourOtherValue',
     }),
   })
   .then((response) => JSON.stringify(console.error(response.json()))) 
   .then((responseData) => { 
     console.error("response: " + responseData); 
   })
   .catch((err) => { 
     console.error(err); 
   });
  }
  render() {
    return (
      <View>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          
        </View>
      </View>
    );
  }
}
