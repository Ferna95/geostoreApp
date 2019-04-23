import React, { Component } from 'react';
import { StatusBar } from 'react-native';
import {createAppContainer, createStackNavigator} from 'react-navigation';
import {Container} from 'native-base';
import {HomeScreen} from './HomeScreen';
import Global from './../common/Global';

const MyStackNavigator = createStackNavigator(
   {
      HomeScreen: {
         screen: HomeScreen,
         navigationOptions: ({ props }) => ({
            headerTitle: 'GEOSTORE',
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

export class HomeScreenIndex extends React.Component {
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

export default HomeScreenIndex;