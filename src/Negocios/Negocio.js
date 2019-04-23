import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  View,
  Image,
  ActivityIndicator,
} from 'react-native';
import Global from './../common/Global';
import { Container, Header, Item, Input, Icon, Button, Text ,Left,Right, Content, Title, List, ListItem, Thumbnail, Body, Segment} from 'native-base';
import {NegocioInformacion} from './NegocioInformacion';
import {NegocioProductos} from './NegocioProductos';
import {NegocioLocation} from './NegocioLocation';
import {HeaderGeostore} from '.././common/HeaderGeostore';


export class Negocio extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      nid: props.navigation.state.params.company_nid,
      activePage: 1,
      activity: false,
    };


  }

  /*
  static navigationOptions = {
    headerTitle: <HeaderGeostore style={{width: 100}} name="NEGOCIO" />,
  };
  */
  
  getCompany(){
    this.setState({activity: true});
   fetch(Global.CONFIGURATION.BASEPATH + 'api/v1/negocio_by_nid?nid='+(this.state.nid)+'&_format=json'+ '&rand=' + new Date().getTime())
   .then(response => response.json()) 
   .then((responseData) => { 
     this.setState({company: responseData,activity: false});
   })
   .catch((err) => { 
     console.error("err"); 
   });
  }

  componentDidMount(){
    this.getCompany();
  }

  selectComponent = (activePage) => () => this.setState({activePage})

  _renderComponent = () => {
    if(this.state.company){
      if(this.state.activePage === 1)
        return <NegocioInformacion company={this.state.company}/> //... Your Component 1 to display
      else if (this.state.activePage === 2)
        return <NegocioProductos company={this.state.company}/> //... Your Component 2 to display
      else
        return <NegocioLocation company={this.state.company}/> //... Your Component 2 to display
    }
  }

  render() {
    return (
      <Container>
        <Segment style={{backgroundColor:Global.COLORS.THREE, borderBottomColor: Global.COLORS.ONE, borderBottomWidth: 1}}>
          <View style={[styles.viewButton, {justiftyContent:"center"}]}>
            <Button style={styles.button} bending first active={this.state.activePage === 1}
                onPress={this.selectComponent(1)}>
              <Icon style={[this.state.activePage === 1 && styles.activeColor]} type="FontAwesome" name="info" />
            </Button>
          </View>
          <View style={[styles.viewButton, {justiftyContent:"center"}]}>
            <Button style={styles.button} active={this.state.activePage === 2}
                onPress= {this.selectComponent(2)}>
              <Icon style={[this.state.activePage === 2 && styles.activeColor]} type="FontAwesome" name="shopping-cart" />
            </Button>
          </View>
          <View style={[styles.viewButton, {justiftyContent:"center"}]}>
            <Button style={styles.button} last active={this.state.activePage === 3}
                onPress= {this.selectComponent(3)}>
              <Icon style={[this.state.activePage === 3 && styles.activeColor]} type="FontAwesome" name="globe" />
            </Button>
          </View>
        </Segment>
        {
          this.state.activity ? 
          (
            <Content contentContainerStyle={{ justifyContent: 'center', flex: 1 }}>
              <View style={[styles.containerActivity, styles.horizontal]}>
                <ActivityIndicator size="large" color={Global.COLORS.ONE} />
              </View>
            </Content>
          ) : this._renderComponent()
        }
       </Container>
     );
   }
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
  },
  activeColor:{
    color: Global.COLORS.ONE,
  },
  button:{
    backgroundColor:Global.COLORS.THREE, 
    flex: 1, 
    borderColor: Global.COLORS.THREE,
  },
  viewButton:{
    flex:1,
    alignItems:"center",
  },
  title: {
    fontSize: 19,
    fontWeight: 'bold',
  },
  activeTitle: {
    color: 'red',
  },
  containerActivity: {
    flex: 1,
    justifyContent: 'center'
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10
  }
});