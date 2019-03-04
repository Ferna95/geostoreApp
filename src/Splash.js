import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  ActivityIndicator,
  Dimensions,
} from 'react-native';


var {height, width} = Dimensions.get('window');

export class Splash extends React.Component {

  static navigationOptions = {

  };

  componentDidMount(){
     // Start counting when the page is loaded
    this.timeoutHandle = setTimeout(()=>{
      this.props.navigation.navigate('Home');        
    }, 3000);
  }


  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.stretch}
          source={require('./images/Splash.jpg')}
        />
        <View style={styles.horizontal}>
          <ActivityIndicator size="large" color="#333333" />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center',
  },
  horizontal: {
    position: "absolute",
    bottom: 0,
    margin: 30,
  },
  stretch: {
    width: width,
    height: height,
  },
});