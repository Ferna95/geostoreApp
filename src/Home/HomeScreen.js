import React, { Component } from 'react';
import { Container, Header, Item, Input,Card, CardItem, Icon, Button, Text ,Left,Right, Content, Title, List, ListItem, Thumbnail, Body,H1} from 'native-base';
import {HeaderGeostore} from '.././common/HeaderGeostore';
import { View, ScrollView, Image, StyleSheet, Dimensions,StatusBar,ImageBackground,ActivityIndicator } from 'react-native';
import Global from './../common/Global';

const { width,height } = Dimensions.get('window');


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
                          vertical
                          pagingEnabled
                          showsVerticalScrollIndicator={false} >
                          {
                            this.state.articles.map((article, i) => {
                              return (
                                <Card style={{backgroundColor: Global.COLORS.THREE, borderColor: Global.COLORS.ONE}}>
                                  <CardItem style={{backgroundColor: Global.COLORS.THREE, border: 0}}>
                                    <Body>
                                      
                                      <ImageBackground
                                        key={i}
                                        source={{uri: Global.CONFIGURATION.BASEPATH + article.field_image}}
                                        style={{width: "100%", height: width * 0.25}}>
                                      </ImageBackground>
                                      <View style={{ justifyContent: 'center', paddingVertical: width * 0.1 }}>
                                        <H1 style={{ color: Global.COLORS.ZERO}}>{article.title}</H1>
                                        <Text style={{ color: Global.COLORS.ZERO}}>
                                          {article.body}
                                        </Text>
                                      </View>
                                      
                                    </Body>
                                  </CardItem>
                                </Card>
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
        width,
    },
    image: {
        width,
        height,
    },
});