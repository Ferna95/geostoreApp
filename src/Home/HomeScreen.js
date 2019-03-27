import React, { Component } from 'react';
import { Container, Header, Item, Input, Icon, Button, Text ,Left,Right, Content, Title, List, ListItem, Thumbnail, Body} from 'native-base';
import {HeaderGeostore} from '.././common/HeaderGeostore';

export class HomeScreen extends React.Component {

  

  constructor(props) {
    super(props);
    this.state = {
      text: '',
    }
  }

  static navigationOptions = {
    headerTitle: <HeaderGeostore style={{width: 100}} name="GEOSTORE" />,
  };

  componentDidMount(){

  }

  render() {
    return (
      <Container>
        <Content>
         
        </Content>
       </Container>
    );
  }
}