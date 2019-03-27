import React, { Component } from 'react';
import { StatusBar } from 'react-native';
import {createAppContainer, createStackNavigator} from 'react-navigation';
import {Container} from 'native-base';
import {Negocios} from './Negocios';
import {Negocio} from './Negocio';
import Global from './../common/Global';

const MyStackNavigator = createStackNavigator(
   {
      Negocios: {
         screen: Negocios,
      },
      Negocio: {
         screen: Negocio,
      },
   },
   {
    defaultNavigationOptions: {
      headerTintColor: Global.COLORS.THREE,
      headerStyle: {
        backgroundColor: Global.COLORS.ONE,
      },
    },
  }
);

const MyApp = createAppContainer(MyStackNavigator);

export class NegociosIndex extends React.Component {
    render(){
      return(
        <Container>
        <StatusBar backgroundColor="#000" barStyle="light-content" />
          <MyApp >
          </MyApp >
        </Container>
      );
    }
}//End of App class

export default NegociosIndex;