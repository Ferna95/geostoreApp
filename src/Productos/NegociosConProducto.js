import React, { Component } from 'react';
import {
  Button,
  StatusBar,
  Picker,
  View,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import Global from './../common/Global';
import { Container, Header, Item, Input, Icon, Text ,Left,Right, Content, Title, List, ListItem, Thumbnail, Body} from 'native-base';
import StarRating from 'react-native-star-rating';

export class NegociosConProducto extends React.Component {

  /*
  static navigationOptions = {
    headerTitle: <HeaderGeostore style={{width: 100}} name="NEGOCIOS CERCANOS" />,
  };
  */
  constructor(props){
    super(props);
    this.state = {
      latitude: 0,
      longitude: 0,
      error: null,
      range: 100,
      activity: false
    };
  }

  componentDidMount(){

    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        });
        this.callNegociosWithProduct();
      },
      (error) => this.setState({ error: error.message })
    );
    
  }

  callNegociosWithProduct(){
    this.setState({activity: true});
    fetch(Global.CONFIGURATION.BASEPATH + 'api/v1/negocios_producto?'
      +'producto_id='+(this.props.navigation.state.params.product_nid)
      +'&latitud='+(this.state.latitude)
      +'&longitud='+(this.state.longitude)
      +'&range='+(this.state.range)
      +'&_format=json'+ '&rand=' + new Date().getTime())
     .then(response => response.json()) 
     .then((responseData) => { 
       this.setState({negocios: responseData, activity: false})
     })
     .catch((err) => { 
       console.error(err); 
     });
  }

  componentDidUpdate(prevProps, prevState){
    if(this.state.range != prevState.range){
      this.callNegociosWithProduct();
    }
  }

  render() {
    return (
      <Container>
        <Header style={{backgroundColor:Global.COLORS.THREE}}>
          <Body style={{flexDirection: "row", flex: 1}}>
            <Title style={{color:Global.COLORS.ONE}}>{this.props.navigation.state.params.product_title}</Title>
          </Body>
          <Item style={{flexDirection: "row", flex: 1}}>
            <Picker
              selectedValue={this.state.range}
              style={{height: 50,flexDirection: "row",flex: 1}}
              onValueChange={(itemValue, itemIndex) => {
                this.setState({range: itemValue});
              }
              }>
              <Picker.Item label="100 mts" value="100" />
              <Picker.Item label="300 mts" value="300" />
              <Picker.Item label="1 km" value="1000" />
              <Picker.Item label="10 kms" value="10000" />
            </Picker>
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
              {this.state.negocios && this.state.negocios.length > 0 ? 
                (
                  <List>
                    { 
                      this.state.negocios.map((prop, key) => {
                        return (
                          <ListItem thumbnail key={key}>
                            <Left>
                              <Thumbnail style={{borderRadius: 10}} square source={{ uri: prop.field_image }} />
                            </Left>
                            <Body>
                              <Text>{prop.title}</Text>
                              <Text note>Dirección: {prop.field_direccion}</Text>
                              <View>
                                {prop.valoracion != 0 ?  
                                  (
                                    <View>
                                      <Text note>Valoración: </Text>
                                      <View style={{paddingHorizontal: 10}}>
                                        <StarRating
                                          disabled={true}
                                          maxStars={5}
                                          rating={parseFloat(prop.valoracion)}
                                          fullStarColor={'gold'}
                                          starSize={20}
                                        />
                                      </View>
                                    </View>
                                  )
                                  : 
                                  (
                                    <Text note>N/A</Text>
                                  )
                                }
                              </View>
                            </Body>
                            <Right>
                              <Text>{prop.field_precio_visible_producto == 1 ? "$" + prop.field_precio_producto : "N/A"}</Text>
                            </Right>
                            <Right>
                              <Button
                                title="Ver"
                                color={Global.COLORS.ONE}
                                onPress={() => this.props.navigation.navigate('Negocio',{company_nid: prop.nid})}
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