import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Button,
} from 'react-native';
import Global from './common/Global';

export default class Logout extends React.Component {
  static navigationOptions = {
    title: 'Logout',
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.loginContainer}>
          <TouchableOpacity style={styles.buttonContainer} onPress={this._signOutAsync}>
            <Text  style={styles.buttonText}>LOGOUT</Text>
          </TouchableOpacity> 
        </View>
      </View>
    );
  }

  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };
}

const styles = StyleSheet.create({

    container: {
      flex: 1,
      backgroundColor: "black",
      padding: 20,
    },
    loginContainer:{
        alignItems: 'center',
        flexGrow: 1,
        justifyContent: 'center'
    },
    formContainer:{

    },
    logo:{

    },
    title:{
      color: Global.COLORS.FOUR,
      fontSize: 40,
      fontWeight: '700',
    },
    input:{
        height: 40,
        backgroundColor: 'rgba(225,225,225,0.2)',
        marginBottom: 10,
        padding: 10,
        color: '#fff'
    },
    buttonContainer:{
        backgroundColor: Global.COLORS.ONE,
        paddingVertical: 15
    },
    buttonText:{
        color: '#fff',
        textAlign: 'center',
        fontWeight: '700'
    }
})