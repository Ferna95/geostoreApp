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
import { Container, Header, Item, Fab,Input, H3,Icon, Text ,Left,Right, Content, Title, List, ListItem, Thumbnail, Body} from 'native-base';
import StarRating from 'react-native-star-rating';

export class NegociosConProducto extends React.Component {
  
  constructor(props){
    super(props);
    this.state = {
      latitude: 0,
      longitude: 0,
      error: null,
      range: 100,
      stars: 5,
      activity: false,
      active: false,
      orderByTitle: true,
      orderByPrice: true,
      orderByStars: true
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
      +'&stars='+(this.state.stars)
      +'&_format=json'+ '&rand=' + new Date().getTime())
     .then(response => response.json()) 
     .then((responseData) => { 
       this.setState({negocios: responseData, activity: false})
     })
     .catch((err) => { 
       console.error(err); 
     });
  }

  reoderCompanies(criteria){
    let negocios;
    
    if(criteria == 'title'){
      negocios = this.state.negocios = this.state.negocios.sort((a,b) => {
        if(this.state.orderByTitle){
          if (a.title < b.title) 
              return -1; 
          if (a.title > b.title) 
              return 1; 
          return 0;
        }
        else{
          if (a.title < b.title) 
              return 1; 
          if (a.title > b.title) 
              return -1; 
          return 0;
        }
      });
    }
    else if(criteria == 'stars'){
      negocios = this.state.negocios.sort((a,b) => {
        if(this.state.orderByStars){
          return b.valoracion - a.valoracion;
        }
        else{
          return a.valoracion - b.valoracion;
        }
      });
    }
    else if(criteria == 'price'){
      negocios = this.state.negocios.sort((a,b) => {
        if(this.state.orderByPrice){
          return b.field_precio_producto - a.field_precio_producto;
        }
        else{
          return a.field_precio_producto - b.field_precio_producto;
        }
      });
    }

    this.setState({negocios: negocios});
  }

  componentDidUpdate(prevProps, prevState){
    if(this.state.range != prevState.range || this.state.stars != prevState.stars){
      this.callNegociosWithProduct();
    }

    if(this.state.orderByTitle != prevState.orderByTitle){
      this.reoderCompanies('title');
    }
    if(this.state.orderByStars != prevState.orderByStars){
      this.reoderCompanies('stars');
    }
    if(this.state.orderByPrice != prevState.orderByPrice){
      this.reoderCompanies('price');      
    }
  }

  render() {
    return (
      <Container>
        <Header style={{backgroundColor: Global.COLORS.THREE}}>
          <Body style={{flexDirection: "row", flex: 1, width: "100%",}}>
            <H3 style={{color:Global.COLORS.ONE, textAlign:"center" ,width: "100%",}}>
              {this.props.navigation.state.params.product_title}
            </H3>
          </Body>
        </Header>
        <Header style={{backgroundColor:Global.COLORS.THREE}}>
          <Item style={{flexDirection: "row", flex: 1}}>
            <Picker
              selectedValue={this.state.stars}
              style={{height: 50,flexDirection: "row",flex: 1}}
              onValueChange={(itemValue, itemIndex) => {
                this.setState({stars: itemValue});
              }
              }>
              <Picker.Item label="<= 5 Estrellas" value="5" />
              <Picker.Item label="<= 4 Estrellas" value="4" />
              <Picker.Item label="<= 3 Estrellas" value="3" />
              <Picker.Item label="<= 2 Estrellas" value="2" />
              <Picker.Item label="<= 1 Estrella" value="1" />
            </Picker>
          </Item>
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
        <StatusBar backgroundColor={Global.COLORS.ZERO} barStyle="light-content" />
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
        <Fab
          active={this.state.active}
          direction="up"
          containerStyle={{}}
          style={{ backgroundColor: Global.COLORS.ONE }}
          position="bottomRight"
          onPress={() => this.setState({ active: !this.state.active })}>
          <Icon name="swap" />
          {this.state.active ? <Button style={{ backgroundColor: Global.COLORS.ZERO }} onPress={() => this.setState({ orderByTitle: !this.state.orderByTitle , active: false })}>
            <Text>A</Text>
          </Button> : null}
          {this.state.active ? <Button style={{ backgroundColor: Global.COLORS.ZERO }} onPress={() => this.setState({ orderByStars: !this.state.orderByStars , active: false })}>
            <Icon name="star" />
          </Button> : null}
          {this.state.active ? <Button style={{ backgroundColor: Global.COLORS.ZERO }} onPress={() => this.setState({ orderByPrice: !this.state.orderByPrice , active: false })}>
            <Icon name="cash" />
          </Button> : null}
        </Fab>
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