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
export class Negocios extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      text: '',
      companies: [],   
      range: 100,
      latitude: 0,
      longitude: 0,
      activity: false,
    }

  }

  static navigationOptions = {
    headerTitle: <HeaderGeostore style={{width: 100}} name="NEGOCIOS" />,
  };

  getCompanies(){
   this.setState({activity: true});
   fetch(Global.CONFIGURATION.BASEPATH + 'api/v1/negocios?keys='+(this.state.text)+'&range='+this.state.range+'&latitud='+this.state.latitude+'&longitud='+this.state.longitude+'&_format=json'+ '&rand=' + new Date().getTime())
   .then(response => response.json()) 
   .then((responseData) => { 
      if(responseData.message == ""){
        responseData = [];
      }
      this.setState({companies: responseData,activity: false})

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
        this.getCompanies();
      },
      (error) => this.setState({ error: error.message })
    );

  }

  componentDidUpdate(prevProps, prevState){
    if(this.state.text != prevState.text){
      this.getCompanies();
    }
    if(this.state.range != prevState.range){
      this.getCompanies();
    }
  }


  render() {
    return (
      <Container>
        <Header searchBar rounded style={{backgroundColor:Global.COLORS.THREE}}>
          <Item>
            <Icon name="ios-search" />
            <Input placeholder="Nombre" onChangeText={(text) => { this.setState({text})}} value={this.state.text} />
          </Item>
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
                {
                  this.state.companies && this.state.companies.length > 0 ? 
                  (
                    <List>
                      { 
                        this.state.companies.map((prop, key) => {
                          return (
                            <ListItem thumbnail key={key}>
                              <Left>
                                <Thumbnail style={{borderRadius: 10}} square source={{ uri: prop.field_image }} />
                              </Left>
                              <Body>
                                <Text>{prop.title}</Text>
                                <Text note numberOfLines={1}>Dirección: {prop.field_direccion}</Text>
                              </Body>
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
                  ) 
                  : 
                  (
                    <Text style={{textAlign:'center',padding:10}}>No hay resultados</Text>
                  )
                }
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