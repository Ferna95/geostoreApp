import React, { Component } from 'react';
import {
  Button,
  StatusBar,
  View,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import Global from './../common/Global';
import { Container, Header, Item, Input, Icon, Text ,Left,Right, Content, Title, List, ListItem, Thumbnail, Body} from 'native-base';

export class Productos extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      activity: false
    }
  }

  getProducts(text){
    this.setState({activity: true});
    fetch(Global.CONFIGURATION.BASEPATH + 'api/v1/productos?keys='+(this.state.text)+'&_format=json'+ '&rand=' + new Date().getTime())
     .then(response => response.json()) 
     .then((responseData) => { 
      if(responseData.message == ""){
          responseData = [];
        }
       this.setState({products: responseData, activity: false})
    })
     .catch((err) => { 
       console.error(err); 
    });
  }


  componentDidUpdate(prevProps, prevState){
    if(this.state.text != prevState.text){
      this.getProducts();
    }
  }

  render() {
    return (
      <Container>
        <Header searchBar rounded style={{backgroundColor:Global.COLORS.THREE}}>
          <Item>
            <Icon name="ios-search" />
            <Input placeholder="Escriba el nombre de un producto" onChangeText={(text) => { this.setState({text})}} value={this.state.text} />
          </Item>
        </Header>
        {
          this.state.activity ? 
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
              {this.state.products && this.state.products.length > 0  ? 
                (
                  <List>
                    { 
                      this.state.products.map((prop, key) => {
                        return (
                          <ListItem thumbnail key={key}>
                            <Left>
                              <Thumbnail style={{borderRadius: 10}} square source={{ uri: prop.field_image }} />
                            </Left>
                            <Body>
                              <Text>{prop.title}</Text>
                              <Text note numberOfLines={1}>Categoría: {prop.field_categoria}</Text>
                            </Body>
                            <Right>
                              <Button
                                title="Encontrar"
                                color={Global.COLORS.ONE}
                                onPress={() => this.props.navigation.navigate('NegociosConProducto',{product_nid: prop.nid,product_title: prop.title})}
                              />
                            </Right>
                          </ListItem>
                        );
                      })
                    }
                  </List>
                ) : (<Text style={{textAlign:'center',padding:10}}>No hay resultados</Text>)}
            </Content>
          )
        }
      </Container>
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