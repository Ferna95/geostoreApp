import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';

export class Productos extends React.Component {

  constructor(props){
    super(props);
    this.state = {

    }
  }

  componentDidMount(){
    fetch('https://fernandomariscottientornosgraficos.000webhostapp.com/ofertas.json')
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({ofertas: responseJson});
    })
    .catch((error) => {
      console.error(error);
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
