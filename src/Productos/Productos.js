import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';
import {HeaderGeostore} from '.././common/HeaderGeostore';

export class Productos extends React.Component {

  static navigationOptions = {
    headerTitle: <HeaderGeostore style={{width: 100}} name="PRODCUTOS" />,
  };

  constructor(props){
    super(props);
    this.state = {

    }
  }

  componentDidMount(){
    
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
