import Expo from 'expo';
import React, { Component } from 'react';
import { Container, Content,  Header, Left, Body, Right,
         Button, Icon, Title, List, ListItem, Text } from 'native-base';

import Colors from '../constants/Colors';

export default class EditProduct extends Component {

  static navigationOptions = {
    title: "Modifica"
  };

  render() {
    return (
      <Container>
        <Header androidStatusBarColor={Colors.tintColorDark} style={{ backgroundColor: Colors.tintColor }}>
          <Left>
           <Button onPress={() => this.props.navigation.goBack()} transparent>
             <Icon style={{color: "white"}} name='arrow-back' />
           </Button>
         </Left>
          <Body>
            <Title style={{color: "white"}}>Modifica</Title>
          </Body>
          <Right></Right>
        </Header>
        <Content>
          <Text>OHUUUU</Text>
        </Content>
      </Container>
    );
  }
}
