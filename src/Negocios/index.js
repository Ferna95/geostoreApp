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
         navigationOptions: ({ props }) => ({
            headerTitle: 'NEGOCIOS',
        }),
      },
      Negocio: {
         screen: Negocio,
         navigationOptions: ({ props }) => ({
            headerTitle: 'NEGOCIO',
        }),
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
          <MyApp >
          </MyApp >
          <StatusBar backgroundColor={Global.COLORS.ZERO} barStyle="light-content" />
        </Container>
      );
    }
}//End of App class

export default NegociosIndex;