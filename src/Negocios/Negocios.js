import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  View,
  Button,
  Image,
} from 'react-native';
import { Container, Header, Item, Input, Icon, Text ,Left,Right, Content, Title, List, ListItem, Thumbnail, Body} from 'native-base';
import {HeaderGeostore} from '.././common/HeaderGeostore';
export class Negocios extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      text: '',
    }
  }

  static navigationOptions = {
    headerTitle: <HeaderGeostore style={{width: 100}} name="NEGOCIOS" />,
  };

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
                            onPress={() => this.props.navigation.navigate('Negocio',{company_nid: prop.nid})}
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
