import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  View,
  Image,
  ActivityIndicator,
  Dimensions,
  ScrollView
} from 'react-native';
import Global from './../common/Global';
import { Text, Container, Left, Right,Card, CardItem, Thumbnail, Content, Body, Grid, Col, Row, H1, H2, Separator} from 'native-base';
import StarRating from 'react-native-star-rating';
import { NewComment } from './NewComment';

const { width, height } = Dimensions.get('window');

export class NegocioInformacion extends React.Component {

  constructor(props) {
    super(props);

    var starCount = props.company[0].field_cantidad_de_valoraciones != 0 ? 
      props.company[0].field_puntos_acumulados / props.company[0].field_cantidad_de_valoraciones : 0;

    this.state = {
      isLoading: true,
      starCount: starCount,
      comments: [],
    }
  }

  getComments(){
   this.setState({isLoading: true});
   fetch(Global.CONFIGURATION.BASEPATH + 'api/v1/comentarios_de_negocio?nid='+(this.props.company[0].nid)+'&_format=json'+ '&rand=' + new Date().getTime())
   .then(response => response.json()) 
   .then((responseData) => { 
      if(responseData.message == ""){
        responseData = [];
      }
      this.setState({comments: responseData,isLoading: false})

   })
   .catch((err) => { 
     console.error(err); 
   });
  }

  componentDidMount(){
    this.getComments();
  }


  render() {
    return (
      <ScrollView>
        <Content style={{padding: width * 0.1}}>
          <Row size={20} style={styles.container}>
            <Col size={30}>
              <Thumbnail style={{borderRadius: 10}} large square source={{ uri: Global.CONFIGURATION.SITEURL + this.props.company[0].field_image }} />
            </Col>
            <Col size={70}>
              <H1>{this.props.company[0].title}</H1>
              <StarRating
                disabled={true}
                maxStars={5}
                rating={this.state.starCount}
                fullStarColor={'gold'}
              />
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
              <Text style={{marginBottom: 15}}>
                <Text style={{fontWeight: 'bold'}}>Comentarios: </Text>
              </Text>
            </Col>
          </Row>
          <NewComment company={this.props.company[0].nid} />
          {
            this.state.comments && this.state.comments.length > 0 ? 
            (
              this.state.comments.map((prop, key) => {
                return (
                  <Card key={key}>
                    <CardItem>
                      <Body>
                        <StarRating
                          disabled={true}
                          maxStars={5}
                          rating={parseFloat(prop.field_puntuacion)}
                          fullStarColor={'gold'}
                          starSize={10}
                        />
                        <Text>
                           {prop.comment_body}
                        </Text>
                      </Body>
                    </CardItem>
                  </Card>
                );
              })
            ) 
            :
            (
              this.state.isLoading ? 
              (
                <ActivityIndicator size="large" color={Global.COLORS.ONE} />
              ) 
              : 
              (
                <Text style={{textAlign:'center',padding:10}}>No hay resultados</Text>
              )
            )
          }
        </Content>
      </ScrollView>
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