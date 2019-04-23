import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  View,
  Image,
  ActivityIndicator,
  Dimensions
} from 'react-native';
import Global from './../common/Global';
import { Text, Container, Left, Right, Thumbnail, Content, Body, Grid, Col, Row, H1, H2, Separator} from 'native-base';
const { width, height } = Dimensions.get('window');

export class NegocioInformacion extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    }
  }



  componentDidMount(){
    this.setState({isLoading: false})
  }


  render() {
    return (
      <Content style={{padding: width * 0.1}}>
        {this.state.isLoading ? (<ActivityIndicator size="large" color={Global.COLORS.ONE} />) : null}
        <Row size={20} style={styles.container}>
          <Col size={30}>
            <Thumbnail style={{borderRadius: 10}} large square source={{ uri: Global.CONFIGURATION.SITEURL + this.props.company[0].field_image }} />
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
      </Content>
     );
   }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10
  }
})