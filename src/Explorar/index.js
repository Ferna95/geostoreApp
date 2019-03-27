import React, { Component } from 'react';
import {createAppContainer, createStackNavigator} from 'react-navigation';
import {Container} from 'native-base';
import {Explorar} from './Explorar';

const MyStackNavigator = createStackNavigator(
   {
      Explorar: {
         screen: Explorar,
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

export class ExplorarIndex extends React.Component {
    render(){
      return(
        <Container>
          <MyApp >
          </MyApp >
        </Container>
      );
    }
}//End of App class

export default ExplorarIndex;