import React, { Component } from 'react';
import { StatusBar } from 'react-native';
import { createDrawerNavigator,createAppContainer,createStackNavigator } from 'react-navigation'
import { Container, Header, Item, Input, Icon, Button, Text ,Left,Right, Content, Title, List, ListItem, Thumbnail, Body} from 'native-base';
import {NegociosIndex} from './src/Negocios';
import {OfertasIndex} from './src/Ofertas';
import {ProductosIndex} from './src/Productos';
import {ExplorarIndex} from './src/Explorar';
import {HomeScreenIndex} from './src/Home';
import LogoutIndex from './src/Logout';
import Global from './src/common/Global';


const MyDrawerNavigator = createDrawerNavigator({
  Geostore:{ 
    screen: HomeScreenIndex,
  },
  Negocios: {
    screen: NegociosIndex,
  },
  Ofertas: {
    screen: OfertasIndex,
  },
  Productos: {
    screen: ProductosIndex,
  },
  Explorar: {
    screen: ExplorarIndex,
  },
  Logout:{
    screen: LogoutIndex,
  }
},
{
  intialRouteName: 'Geostore',
  drawerBackgroundColor: Global.COLORS.THREE,
  contentOptions: {
    activeTintColor: Global.COLORS.ONE,
    itemsContainerStyle: {
      marginVertical: 0,
    },
    iconContainerStyle: {
      opacity: 1
    }
  }
});


 
const MyApp = createAppContainer(MyDrawerNavigator);

class App extends React.Component{
    render(){
      return(
        <Container >
          <MyApp >
          </MyApp >
          <StatusBar backgroundColor={Global.COLORS.ZERO} barStyle="light-content" />
        </Container>
      );
    }
}//End of App class

export default App;
