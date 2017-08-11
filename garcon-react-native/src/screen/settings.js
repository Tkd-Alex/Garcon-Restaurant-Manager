import Expo from 'expo';
import React, { Component } from 'react';
import { Container, Content,  Header, Left, Body, Right,
         Button, Icon, Title, List, ListItem, Text } from 'native-base';

import Colors from '../constants/Colors';

export default class Settings extends Component {

  static navigationOptions = {
    title: "Settings"
  };

  render() {
    return (
      <Container>
        <Header androidStatusBarColor={Colors.tintColorDark} style={{ backgroundColor: Colors.tintColor }}>
          <Body>
            <Title style={{color: "white"}}>Impostazioni</Title>
          </Body>
        </Header>
        <Content>
        </Content>
      </Container>
    );
  }
}
