import React, { Component } from 'react';
import {StatusBar } from 'react-native';
import {createAppContainer, createStackNavigator} from 'react-navigation';
import {Container} from 'native-base';
import {Productos} from './Productos';
import {Negocio} from './../Negocios/Negocio';
import {NegociosConProducto} from './NegociosConProducto';
import Global from './../common/Global';

const MyStackNavigator = createStackNavigator(
   {
      Productos: {
         screen: Productos,
         navigationOptions: ({ props }) => ({
            headerTitle: 'PRODUCTOS',
        }),
      },
      NegociosConProducto:{
        screen: NegociosConProducto,
        navigationOptions: ({ props }) => ({
            headerTitle: 'NEGOCIOS CON PRODUCTO',
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

export class ProductosIndex extends React.Component {
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

export default ProductosIndex;