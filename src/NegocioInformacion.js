import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  View,
  Image,
} from 'react-native';
import { Text, Container, Left, Right, Thumbnail, Content, Body, Grid, Col, Row, H1, H2, Separator} from 'native-base';


export class NegocioInformacion extends React.Component {

  constructor(props) {
    super(props);
  }



  componentDidMount(){

  }


  render() {
    return (
      <Container>
        <Grid>
          <Row size={20}>
            <Col size={30}>
              <Thumbnail large square source={{ uri: 'http://192.168.0.10:8080/' + this.props.company[0].field_image }} />
            </Col>
            <Col size={70}>
              <H1>{this.props.company[0].title}</H1>
            </Col>  
          </Row>
          <Row size={80}>
            <Col>
              <Text style={{marginBottom: 15}}>{this.props.company[0].body}</Text>
              <Text style={{marginBottom: 15}}>
                <Text style={{fontWeight: 'bold'}}>Teléfono: </Text>
                <Text>{this.props.company[0].field_telefono}</Text>
              </Text>
              <Text style={{marginBottom: 15}}>
                <Text style={{fontWeight: 'bold'}}>Dirección: </Text>
                <Text>{this.props.company[0].field_direccion}</Text>
              </Text>
              <Text style={{marginBottom: 15}}>
                <Text style={{fontWeight: 'bold'}}>Horarios: </Text>
                <Text>{this.props.company[0].field_horarios}</Text>
              </Text>
            </Col>
          </Row>
        </Grid>
      </Container>
     );
   }
}
