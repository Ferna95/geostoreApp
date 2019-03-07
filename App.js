import React, { Component } from 'react';
import { View } from 'react-native';
import { createDrawerNavigator,createAppContainer,createStackNavigator } from 'react-navigation'
import { Container, Header, Item, Input, Icon, Button, Text ,Left,Right, Content, Title, List, ListItem, Thumbnail, Body} from 'native-base';
import {NegociosIndex} from './src/Negocios';
import {OfertasIndex} from './src/Ofertas';
import {ProductosIndex} from './src/Productos';
import {ExplorarIndex} from './src/Explorar';

class MyHomeScreen extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      text: '',
    }
  }

  getCompanies(text){
   fetch('http://192.168.0.10:8080/geostore_testing/api/v1/negocios?keys='+(this.state.text)+'&_format=json')
   .then(response => response.json()) 
   .then((responseData) => { 
     this.setState({companies: responseData})
   })
   .catch((err) => { 
     console.error("err"); 
   });
  }

  componentDidMount(){

  }

  render() {
    return (
      <Container>
        <Header>
          <Left style={{ flexDirection: 'row'}}>
           <Icon onPress={() => this.props.navigation.openDrawer()} name="md-menu" style={{ color: 'white', marginRight: 15 }} />
          </Left>
          <Body>
            <Title>Home</Title>
          </Body>
          <Right>
           <Icon name="md-cart" style={{ color: 'white' }} />
          </Right>
        </Header>
        <Content>
          
        </Content>
       </Container>
     );
   }
 }// End of MyHomeScreen class


const MyDrawerNavigator = createDrawerNavigator({
   Home:{ 
      screen: MyHomeScreen,
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
 },
 {
  initialRouteName: 'Negocios',
 }
 );


 
const MyApp = createAppContainer(MyDrawerNavigator);

class App extends React.Component{
    render(){
      return(
        <Container>
          <MyApp >
          </MyApp >
        </Container>
      );
    }
}//End of App class

export default App;
