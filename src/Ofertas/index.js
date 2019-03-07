import React, { Component } from 'react';
import {createAppContainer, createStackNavigator} from 'react-navigation';
import {Container} from 'native-base';
import {Ofertas} from './Ofertas';

const MyStackNavigator = createStackNavigator(
   {
      Ofertas: {
         screen: Ofertas,
      },
   },
);

const MyApp = createAppContainer(MyStackNavigator);

export class OfertasIndex extends React.Component {
    render(){
      return(
        <Container>
          <MyApp >
          </MyApp >
        </Container>
      );
    }
}//End of App class

export default OfertasIndex;