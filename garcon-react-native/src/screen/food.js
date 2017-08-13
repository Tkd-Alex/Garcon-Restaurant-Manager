import Expo from 'expo';
import React, { Component } from 'react';
import { View, Platform } from 'react-native';
import { Container, Content,  Header, Left, Body, Right,
         Button, Icon, Title, List, ListItem, Text, InputGroup, Input } from 'native-base';

import Colors from '../constants/Colors';
import ListItemCustom from '../components/ListItemCustom';

export default class Food extends Component {

  static navigationOptions = {
    title: "Food"
  };

  render() {
    return (
      <Container>
        <Header androidStatusBarColor={Colors.tintColorDark} style={{ backgroundColor: Colors.tintColor }}>
          <Body>
            <Title style={{color: "white"}}>Cibo</Title>
          </Body>
        </Header>
        <InputGroup borderType="underline" >
          <Icon ios="ios-search" android="md-search" style={{ color: Colors.inactiveTintColor }}/>
          <Input placeholder="Cerca..." />
        </InputGroup>
        <Content>
          <List>
            <ListItemCustom title="Pizza mararina" description="Gli ingredienti della pizza" iterateIndex='0' />
          </List>
        </Content>
      </Container>
    );
  }
}
