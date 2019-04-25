import React, { Component } from 'react';
import {
  View,
  TextInput,
  Text,
  Button,
} from 'react-native';
import StarRating from 'react-native-star-rating';
import {Body, Card, CardItem} from 'native-base';
import Global from './../common/Global';
export class NewComment extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      starCount: 0,
      text: '',
    };
  }

  componentDidMount(){
  }


  onStarRatingPress(rating) {
    this.setState({
      starCount: rating
    });
  }

  sendComment(){
    fetch(Global.CONFIGURATION.BASEPATH + 'api/v1/insert_comment?nid='+(this.props.company)
      +'&stars=' + (this.state.starCount)
      +'&comment=' + (this.state.text))
    .then(response => response.json()) 
    .then((responseData) => { 
      alert("OK");
    })
    .catch((err) => { 
     console.error(err); 
    });
  }

  render() {
    return (
      <Card>
        <CardItem>
          <Body>
            <Text style={{color: Global.COLORS.ONE, marginBottom: 5}}>¿Qué le parece este negocio?</Text>
            <View style={{ marginBottom: 5}}>
              <StarRating
                disabled={false}
                maxStars={5}
                rating={this.state.starCount}
                starSize={20}
                fullStarColor={'gold'}
                selectedStar={(rating) => this.onStarRatingPress(rating)}
              />
            </View>
            <View style={{borderColor: Global.COLORS.ONE ,borderBottomWidth: 1, width: '100%', marginBottom: 5 }}>
              <TextInput
                multiline = {true}
                placeholder = "Ingrese un comentario"
                editable = {true}
                maxLength = {40}
                onChangeText={(text) => this.setState({text})}
              />
            </View>
            <View style={{width: '100%'}}>
              <Button onPress={() => this.sendComment()}
              title="Enviar opinión"
              color={Global.COLORS.ONE}
              accessibilityLabel="Enviar comentario y puntuación"/>
            </View>
          </Body>
        </CardItem>
      </Card>
     );
   }
}