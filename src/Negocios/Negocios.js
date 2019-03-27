import React, { Component } from 'react';
import {
  Button,
  StatusBar
} from 'react-native';
import Global from './../common/Global';
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
   fetch(Global.CONFIGURATION.BASEPATH + 'api/v1/negocios?keys='+(this.state.text)+'&_format=json')
   .then(response => response.json()) 
   .then((responseData) => { 
     this.setState({companies: responseData})
     console.log(this.state.text);
     console.log(responseData);
   })
   .catch((err) => { 
     console.error(err); 
   });
  }

  componentDidMount(){
   
  }

  render() {
    return (
      <Container>
        <Header searchBar rounded style={{backgroundColor:Global.COLORS.THREE}}>
          <Item>
            <Icon name="ios-search" />
            <Input placeholder="Buscar" onChangeText={(text) => { this.setState({text});text.length >= 3 ? this.getCompanies() : null; }} value={this.state.text} />
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
                          <Thumbnail square source={{ uri: prop.field_image }} />
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
