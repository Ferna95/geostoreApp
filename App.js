import React, { Component } from 'react';
import { View } from 'react-native';
import { createDrawerNavigator,createAppContainer } from 'react-navigation'
import { Container, Header, Item, Input, Icon, Button, Text ,Left,Right, Content, Title, List, ListItem, Thumbnail, Body} from 'native-base';
import {Splash} from './src/Splash';
import {Negocios} from './src/Negocios';
import {Ofertas} from './src/Ofertas';
import {Productos} from './src/Productos';
import {Explorar} from './src/Explorar';


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
        <Header searchBar rounded>
          <Item>
            <Icon name="ios-search" />
            <Input placeholder="Search" onBlur={(text) => this.getCompanies()} onChangeText={(text) => {this.setState({text}); }} value={this.state.text} />
            <Icon name="ios-people" />
          </Item>
          <Button transparent >
            <Text>Buscar</Text>
          </Button>
        </Header>
        <Content>
          {this.state.companies ? 
            (
              <List>
                { 
                  this.state.companies.map((prop, key) => {
                    return (
                      <ListItem thumbnail key={key}>
                        <Left>
                          <Thumbnail square source={{ uri: 'http://192.168.0.10:8080/' + prop.field_image }} />
                        </Left>
                        <Body>
                          <Text>{prop.title}</Text>
                          <Text note numberOfLines={1}>Dirección: {prop.field_direccion}</Text>
                        </Body>
                        <Right>
                          <Button transparent>
                            <Text>Ver</Text>
                          </Button>
                        </Right>
                      </ListItem>
                    );
                  })
                }
              </List>
            ) : (null)}
        </Content>
       </Container>
     );
   }
 }// End of MyHomeScreen class

class MyNotificationsScreen extends React.Component {
   render() {
     return (
       <View style={{ marginTop:100,marginLeft:100}}>
         <Button onPress={() => this.props.navigation.navigate('Home')} >
           <Text>Go back home</Text>
         </Button>
       </View>
     );
    }
}//End of MyNotificationsScreen class

const MyDrawerNavigator = createDrawerNavigator({
   Splash:{
      screen: Splash,
   },
   Home:{ 
      screen: MyHomeScreen,
   },
   Negocios: {
      screen: Negocios,
   },
   Ofertas: {
      screen: Ofertas,
   },
   Productos: {
      screen: Productos,
   },
   Explorar: {
      screen: Explorar,
   },
 });
 
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
