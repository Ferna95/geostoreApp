import React, { Component } from 'react';
import { Container, Header, Item, Input, Icon, Button, Text ,Left,Right, Content, Title, List, ListItem, Thumbnail, Body,H1} from 'native-base';
import {HeaderGeostore} from '.././common/HeaderGeostore';
import { View, ScrollView, Image, StyleSheet, Dimensions,StatusBar,ImageBackground,ActivityIndicator } from 'react-native';
import Global from './../common/Global';

const { width } = Dimensions.get('window');
const height = width;


export class HomeScreen extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      articles: [],
    }
  }

  getArticles(){
    this.setState({activity: true});
    fetch(Global.CONFIGURATION.BASEPATH + 'api/v1/noticias?_format=json'+ '&rand=' + new Date().getTime())
      .then(response => response.json()) 
      .then((responseData) => { 
       this.setState({articles: responseData,activity: false});
      })
      .catch((err) => { 
       console.error("err"); 
      });
  }

  componentDidMount(){
    this.getArticles();
  }

  render() {
    if (this.state.articles) {
        return (
          <Container >
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
                <Content style={{backgroundColor: Global.COLORS.ZERO}}>
                  <View style={styles.scrollContainer}>
                      <ScrollView
                          horizontal
                          pagingEnabled
                          showsHorizontalScrollIndicator={true} >
                          {
                            this.state.articles.map((article, i) => {
                              return (
                                <ImageBackground
                                  key={i}
                                  source={{uri: Global.CONFIGURATION.BASEPATH + article.field_image}}
                                  style={{width: width}}>
                                  <View style={{ justifyContent: 'center', flex: 1, padding: width * 0.1 }}>
                                    <H1 style={{ color: "white"}}>{article.title}</H1>
                                    <Text style={{ color: "white"}}>
                                      {article.body}
                                    </Text>
                                  </View>
                                </ImageBackground>
                              )
                            })
                          }
                      </ScrollView>
                  </View>
                </Content>
              )
            }
          </Container>
        );
    }
    return null;
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: StatusBar.currentHeight,
    },
    scrollContainer: {
        height,
    },
    image: {
        width,
        height,
    },
});