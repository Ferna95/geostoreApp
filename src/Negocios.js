import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  View,
  Button,
  Image,
} from 'react-native';
import { Container, Header, Item, Input, Icon, Text ,Left,Right, Content, Title, List, ListItem, Thumbnail, Body} from 'native-base';

export class Negocios extends React.Component {


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
            <Title>Negocios</Title>
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
                          <Button
                            title="Ver"
                            onPress={() => this.props.navigation.navigate('Negocio')}
                          />
                        </Right>
                      </ListItem>
                    );
                  })
                }
              </List>
            ) : (<Text>No hay resultados</Text>)}
        </Content>
       </Container>
     );
   }
}
