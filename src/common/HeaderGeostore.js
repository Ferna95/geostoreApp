import React, { Component } from 'react';

import {Icon,Grid, Col,Text, Container, Content, Row} from 'native-base';
import Global from './Global';
export class HeaderGeostore extends React.Component {
 
  constructor(props) {
    super(props);
    //console.error(this.props);

  }

  render() {
    return (
      <Grid style={{padding: 10}}>
        <Col>
          
        </Col>
        <Col>
          <Text style={{textAlign: 'center', color:Global.COLORS.TWO, fontSize: 19}}>{this.props.name}</Text>
        </Col>
        <Col>
          
        </Col>
      </Grid>
    );
  }
}