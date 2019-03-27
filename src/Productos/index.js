import React, { Component } from 'react';
import {StatusBar } from 'react-native';
import {createAppContainer, createStackNavigator} from 'react-navigation';
import {Container} from 'native-base';
import {Productos} from './Productos';
import Global from './../common/Global';

const MyStackNavigator = createStackNavigator(
   {
      Productos: {
         screen: Productos,
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

export class ProductosIndex extends React.Component {
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

export default ProductosIndex;