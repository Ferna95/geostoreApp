import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  View,
  Image,
} from 'react-native';
import { Container, Header, Item, Input, Icon, Button, Text ,Left,Right, Content, Title, List, ListItem, Thumbnail, Body, Segment} from 'native-base';
import {NegocioInformacion} from './NegocioInformacion';
import {NegocioProductos} from './NegocioProductos';
import {NegocioLocation} from './NegocioLocation';


export class Negocio extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      nid: 7,
      activePage: 1,
    }
  }

  getCompany(){
   fetch('http://192.168.0.10:8080/geostore_testing/api/v1/negocio_by_nid?nid='+(this.state.nid)+'&_format=json')
   .then(response => response.json()) 
   .then((responseData) => { 
     this.setState({company: responseData});
   })
   .catch((err) => { 
     console.error("err"); 
   });
  }

  componentDidMount(){
   this.getCompany();
  }

  selectComponent = (activePage) => () => this.setState({activePage})

  _renderComponent = () => {
    if(this.state.company){
      if(this.state.activePage === 1)
        return <NegocioInformacion company={this.state.company}/> //... Your Component 1 to display
      else if (this.state.activePage === 2)
        return <NegocioProductos company={this.state.company}/> //... Your Component 2 to display
      else
        return <NegocioLocation company={this.state.company}/> //... Your Component 2 to display
    }
  }

  render() {
    return (
      <Container>
        <Header hasSegment>
          <Left style={{ flexDirection: 'row'}}>
           <Icon onPress={() => this.props.navigation.openDrawer()} name="md-menu" style={{ color: 'white', marginRight: 15 }} />
          </Left>
          <Body>
            <Title>Negocio</Title>
          </Body>
          <Right>
           <Icon name="md-cart" style={{ color: 'white' }} />
          </Right>
        </Header>
        <Segment>
          <Button first active={this.state.activePage === 1}
              onPress={this.selectComponent(1)}>
            <Icon type="FontAwesome" name="info" />
          </Button>
          <Button active={this.state.activePage === 2}
              onPress= {this.selectComponent(2)}>
            <Icon type="FontAwesome" name="shopping-cart" />
          </Button>
          <Button last active={this.state.activePage === 3}
              onPress= {this.selectComponent(3)}>
            <Icon type="FontAwesome" name="globe" />
          </Button>
        </Segment>
        <Content padder>
          <Content padder>
            {this._renderComponent()}
           </Content>
        </Content>
       </Container>
     );
   }
}
