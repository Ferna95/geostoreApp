import React, { Component } from 'react';
import { StatusBar } from 'react-native';
import {createAppContainer, createStackNavigator} from 'react-navigation';
import {Container} from 'native-base';
import {Ofertas} from './Ofertas';
import Global from './../common/Global';
import {Negocio} from './../Negocios/Negocio';

const MyStackNavigator = createStackNavigator(
   {
      Ofertas: {
         screen: Ofertas,
         navigationOptions: ({ props }) => ({
            headerTitle: 'OFERTAS',
        }),
      },
      Negocio:{
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

export class OfertasIndex extends React.Component {
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

export default OfertasIndex;