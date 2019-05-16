import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View,
  Button,
  Text, 
  TextInput, 
  TouchableOpacity,
  Image,
  Alert
} from 'react-native';
import Global from '@src/common/Global';

export default class Register extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      name: '',
      pass: '',
      mail: '',
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.loginContainer}>
          <Image resizeMode="contain" style={styles.logo} source={require('@src/images/logo.png')} />
          <Text style={styles.title}>GEOSTORE</Text>
        </View>
        <View style={styles.formContainer} >
          <TextInput style = {styles.input} 
                 autoCapitalize="none" 
                 onSubmitEditing={() => this.emailInput.focus()} 
                 autoCorrect={false} 
                 onChangeText={(text) => this.setState({name: text})}
                 keyboardType='email-address' 
                 returnKeyType="next" 
                 placeholder='Usuario' 
                 placeholderTextColor='rgba(225,225,225,0.7)'/>

          <TextInput style = {styles.input} 
                 autoCapitalize="none" 
                 onSubmitEditing={() => this.passwordInput.focus()} 
                 autoCorrect={false} 
                 ref={(input)=> this.emailInput = input} 
                 onChangeText={(text) => this.setState({mail: text})}
                 keyboardType='email-address' 
                 returnKeyType="next" 
                 placeholder='Email' 
                 placeholderTextColor='rgba(225,225,225,0.7)'/>

          <TextInput style = {styles.input}   
                returnKeyType="go" 
                autoCapitalize="none" 
                onChangeText={(text) => this.setState({pass: text})}
                ref={(input)=> this.passwordInput = input} 
                placeholder='Contraseña' 
                placeholderTextColor='rgba(225,225,225,0.7)' 
                secureTextEntry/>

          <TouchableOpacity style={styles.buttonContainer} onPress={this._registerAsync}>
            <Text  style={styles.buttonText}>REGISTRARSE</Text>
          </TouchableOpacity> 
        </View>
      </View>
    );
  }

  _registerAsync = async () => {

    let response = await fetch(Global.CONFIGURATION.BASEPATH + 'user/register?_format=json',{
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'name': {
          'value': this.state.name,
        },
        'mail': {
          'value': this.state.mail,
        },
        'pass': {
          'value': this.state.pass,
        }
      }),
    });

    let responseData = await response.json();

    if(responseData.uid){

      let responseLogin = await fetch(Global.CONFIGURATION.BASEPATH + 'user/login?_format=json',{
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: this.state.name,
          pass: this.state.pass,
        }),
      });

      let responseLoginData = await responseLogin.json();
      if(responseLoginData.current_user){
        await AsyncStorage.setItem('userToken', responseLoginData.csrf_token);
        await AsyncStorage.setItem('uid', responseLoginData.current_user.uid);
        await AsyncStorage.setItem('username', responseLoginData.current_user.name);
        this.props.navigation.navigate('App');

      }
      else{
        Alert.alert("Error de autenticación","Los datos ingresados son incorrectos");
      }
    }
    else{
      Alert.alert("Error de registro",responseData.message);
    }

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