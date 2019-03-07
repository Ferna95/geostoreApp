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