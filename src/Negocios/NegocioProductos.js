import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
} from 'react-native';
import { Container, Header, Item, Input, Icon, Text ,Left,Right, Content, Title, List, ListItem, Thumbnail, Row, Body, Col, Button, H2} from 'native-base';

export class NegocioProductos extends React.Component {

  constructor(props) {
    super(props);
    this.state = {

    }
  }

  getProducts(){
   fetch('http://192.168.0.10:8080/geostore_testing/api/v1/productos_de_negocio_by_nid?nid='+(this.props.company[0].nid)+'&_format=json')
   .then(response => response.json()) 
   .then((responseData) => { 
     this.setState({productos: responseData});
   })
   .catch((err) => { 
     console.error("err"); 
   });
  }

  componentDidMount(){
   this.getProducts();
  }

  render() {
    return (
      <Container>
        <Content>
          {this.state.productos ? 
            (
              <List>
                { 
                  this.state.productos.map((prop, key) => {
                    return (
                      <ListItem thumbnail key={key}>
                        <Body>
                          <Row>
                            <Col size={30}>
                              <Thumbnail square source={{ uri: 'http://192.168.0.10:8080/' + prop.field_image }} />
                            </Col>
                            <Col size={70}>
                              <H2>{prop.field_producto}</H2>
                              {
                                prop.field_precio_visible == 1 ? (<Text>$ {prop.field_precio}</Text>) : null
                              }
                            </Col>
                          </Row>
                        </Body>
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
