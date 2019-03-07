import React, { Component } from 'react';

import {Icon,Grid, Col,Text, Container, Content, Row} from 'native-base';

export class HeaderGeostore extends React.Component {
 
  constructor(props) {
    super(props);
    //console.error(this.props);

  }

  render() {
    return (
      <Grid style={{padding: 10}}>
        <Col>
          <Icon style={{textAlign: 'left', color:"#a7d7c5"}} name="menu" />
        </Col>
        <Col>
          <Text style={{textAlign: 'center', color:"#a7d7c5", fontSize: 20}}>{this.props.name}</Text>
        </Col>
        <Col>
          
        </Col>
      </Grid>
    );
  }
}