import React, { Component } from 'react';
import {
  Button,
  StatusBar,
  Picker,
  ActivityIndicator,
  StyleSheet,
  View
} from 'react-native';
import Global from './../common/Global';
import { Container, Header, Item, Input, Icon, Text ,Left,Right, Content, Title, List, ListItem, Thumbnail, Body} from 'native-base';
import {HeaderGeostore} from '.././common/HeaderGeostore';
export class Ofertas extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      text: '',
      ofertas: [],    
      range: 100,
      latitude: 0,
      longitude: 0,
      activity: false,
    }

  }

  static navigationOptions = {
    headerTitle: <HeaderGeostore style={{width: 100}} name="OFERTAS" />,
  };

  getOfertas(){
   
   this.setState({activity: true});
   fetch(Global.CONFIGURATION.BASEPATH + 'api/v1/ofertas?order='+this.state.order+'&latitud='+this.state.latitude+'&longitud='+this.state.longitude+'&range='+this.state.range+'&_format=json'+ '&rand=' + new Date().getTime())
   .then(response => response.json()) 
   .then((responseData) => { 
     this.setState({ofertas: responseData,activity: false})
     console.log(responseData);
   })
   .catch((err) => { 
     console.error(err); 
   });
  }

  componentDidMount(){

    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        });
        this.getOfertas();
      },
      (error) => this.setState({ error: error.message })
    );

  }

  componentDidUpdate(prevProps, prevState){
    if(this.state.range != prevState.range){
      this.getOfertas();
    }
  }

  render() {
    return (
      <Container>
        <Header searchBar rounded style={{backgroundColor:Global.COLORS.THREE}}>
          <Item>
            <Picker
              selectedValue={this.state.range}
              style={{height: 50, flexDirection: "row", flex: 1}}
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
        {this.state.activity ? 
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
                {this.state.ofertas && this.state.ofertas.length > 0? 
                  (
                    <List>
                      { 
                        this.state.ofertas.map((prop, key) => {
                          return (
                            <ListItem thumbnail key={key}>
                              <Left>
                                <Thumbnail style={{borderRadius: 10}} square source={{ uri: prop.company_image }} />
                              </Left>
                              <Body>
                                <Text>{prop.company_title}: {prop.title}</Text>
                                <Text note numberOfLines={1}>Dirección: {prop.company_direccion}</Text>
                                <Text note>Productos: {"\n"}{prop.field_productos_de_oferta}</Text>
                                <Text note numberOfLines={1}>Precio: ${prop.field_precio}</Text>
                              </Body>
                              <Right>
                                <Button
                                  title="Ver"
                                  color={Global.COLORS.ONE}
                                  onPress={() => this.props.navigation.navigate('Negocio',{company_nid: prop.company_id})}
                                />
                              </Right>
                            </ListItem>
                          );
                        })
                      }
                    </List>
                  ) : (<Text style={{textAlign:'center',padding:10}}>No existen ofertas dentro del rango</Text>)}
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