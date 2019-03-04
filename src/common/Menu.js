import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  Image,
} from 'react-native';

import Global from './Global.js';

export default class Menu extends React.Component {
 

  render() {
    return (
      <View style={{flex: 1}}>
        <Button
          onPress={() => this.props.navigation.navigate('Productos')}
          title="Productos"
          color={Global.COLORS.ONE}
        />
        <Button
          onPress={() => this.props.navigation.navigate('Negocios')}
          title="Negocios"
          color={Global.COLORS.ONE}
        />
        <Button
          onPress={() => this.props.navigation.navigate('Ofertas')}
          title="Ofertas"
          color={Global.COLORS.ONE}
        />
        <Button
          onPress={() => this.props.navigation.navigate('Explorar')}
          title="Explorar"
          color={Global.COLORS.ONE}
        />
      </View>
    );
  }
}