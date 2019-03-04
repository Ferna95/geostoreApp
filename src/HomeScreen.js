import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';

import HeaderApp from './common/HeaderApp.js';

export default class HomeScreen extends React.Component {

  render() {
    return (
      <View>
        <HeaderApp name="GEOSTORE" />
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Button
          title="Go to Details"
          onPress={() => this.props.navigation.navigate('Details')}
        />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
