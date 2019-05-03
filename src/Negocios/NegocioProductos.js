import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  ActivityIndicator,
  View,
} from 'react-native';
import decode from 'unescape';
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
    console.log(Global.CONFIGURATION.BASEPATH + 'api/v1/productos_de_negocio_by_nid?nid='+(this.props.company[0].nid)+'&_format=json');
    fetch(Global.CONFIGURATION.BASEPATH + 'api/v1/productos_de_negocio_by_nid?nid='+(this.props.company[0].nid)+'&_format=json'+ '&rand=' + new Date().getTime())
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
      this.state.isLoading ? 
        (
          <Content contentContainerStyle={{ justifyContent: 'center', flex: 1 }}>
            <View style={[styles.container, styles.horizontal]}>
              <ActivityIndicator size="large" color={Global.COLORS.ONE} />
            </View>
          </Content>
        ) 
        : 
        (
          <Content>
            {this.state.productos ? 
              (
                <List>
                  { 
                    this.state.productos.map((prop, key) => {
                      return (
                        <ListItem thumbnail key={key}>
                          <Left>  
                            { 
                              prop.field_image ? 
                                (
                                  <Thumbnail style={{borderRadius: 10}} square source={{ uri: Global.CONFIGURATION.SITEURL + prop.field_image }} />
                                )
                                :
                                (
                                  <Thumbnail style={{borderRadius: 10}} square source={{ uri: Global.CONFIGURATION.SITEURL + "themes/geostore/images/img-muestra.jpg"}} />
                                )
                            }
                          </Left>
                          <Body>
                            <Text>{decode(prop.field_producto)}</Text>
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
              ) 
              :
              (
                <Text>No hay resultados</Text>
              )
            }
          </Content>
        )
      
     );
   }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10
  }
})