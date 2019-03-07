import React, { Component } from 'react';
import {createAppContainer, createStackNavigator} from 'react-navigation';
import {Container} from 'native-base';
import {Negocios} from './Negocios';
import {Negocio} from './Negocio';

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
      headerTintColor: '#a7d7c5',
      headerStyle: {
        backgroundColor: '#1c1124',
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
        </Container>
      );
    }
}//End of App class

export default NegociosIndex;