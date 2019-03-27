import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import Global from './../common/Global';
import { Container, Header, Item, Input, Icon, Text ,Left,Right, Content, Title, List, ListItem, Thumbnail, Row, Body, Col, Button, H2} from 'native-base';

export class NegocioProductos extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      productos: [],
    }
  }

  getProducts(){
    this.setState({isLoading: true});

    fetch(Global.CONFIGURATION.BASEPATH + 'api/v1/productos_de_negocio_by_nid?nid='+(this.props.company[0].nid)+'&_format=json')
     .then(response => response.json()) 
     .then((responseData) => { 
       this.setState({productos: responseData});
       this.setState({isLoading: false});
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
      <Content>
        {this.state.isLoading ? (<ActivityIndicator size="large" color={Global.COLORS.ONE} />) : null}
        {this.state.productos ? 
          (
            <List>
              { 
                this.state.productos.map((prop, key) => {
                  return (
                    <ListItem thumbnail key={key}>
                      <Left>  
                          <Thumbnail style={{borderRadius: 50}} square source={{ uri: Global.CONFIGURATION.SITEURL + prop.field_image }} />
                      </Left>
                      <Body>
                        <Text>{prop.field_producto}</Text>
                      </Body>
                      <Right>
                        {
                          prop.field_precio_visible == 1 ? (<Text note>$ {prop.field_precio}</Text>) : null
                        }
                      </Right>
                    </ListItem>
                  );
                })
              }
            </List>
          ) : (<Text>No hay resultados</Text>)}
      </Content>
     );
   }
}
