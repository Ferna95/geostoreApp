import React, { Component } from 'react';
import {createAppContainer, createStackNavigator} from 'react-navigation';
import {Container} from 'native-base';
import {Productos} from './Productos';

const MyStackNavigator = createStackNavigator(
   {
      Productos: {
         screen: Productos,
      },
   },
);

const MyApp = createAppContainer(MyStackNavigator);

export class ProductosIndex extends React.Component {
    render(){
      return(
        <Container>
          <MyApp >
          </MyApp >
        </Container>
      );
    }
}//End of App class

export default ProductosIndex;