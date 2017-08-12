import Expo from 'expo';
import React, { Component } from 'react';
import { View, Platform } from 'react-native';
import { Container, Content,  Header, Left, Body, Right,
         Button, Icon, Title, List, ListItem, Text, InputGroup, Input } from 'native-base';

import Colors from '../constants/Colors';

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

            { /*
            |===================
            | Ios solution
            |===================
            */}

            {Platform.OS === 'ios' &&
            <ListItem style={{marginLeft: 0}} onPress={() => {alert("TEST!")}}>
              <View style={{width: '75%'}}>
                <Body>
                  <Text>Pizza margherita</Text>
                  <Text note style={{fontSize: 12}}>S. di Pomodoro, Mozzarella, Salame Piccante, Cipolla, Olive nere, Peperoncino</Text>
                </Body>
              </View>
              <View>
              <Right>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                  <Button style={{ paddingLeft: 5, paddingRight: 5, marginLeft: 5  }} small success><Icon name='ios-add' /></Button>
                  <Button style={{ paddingLeft: 5, paddingRight: 5, marginLeft: 5  }} small danger><Icon name='ios-remove' /></Button>
                </View>
              </Right>
              </View>
            </ListItem>
            }

            { /*
            |===================
            | Android solution
            |===================
            */}

            {Platform.OS === 'android' &&
            <ListItem style={{marginLeft: 0}}>
              <Body>
                <Text>Pizza margherita</Text>
                <Text note>S. di Pomodoro, Mozzarella, Salame Piccante, Cipolla, Olive nere, Peperoncino</Text>
              </Body>
              <Right>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                  <Button style={{ paddingLeft: 5, paddingRight: 5, marginLeft: 5  }} small success><Icon name='md-add'/></Button>
                  <Button style={{ paddingLeft: 5, paddingRight: 5, marginLeft: 5  }} small danger><Icon name='md-remove'/></Button>
                </View>
              </Right>
            </ListItem>
            }

          </List>
        </Content>
      </Container>
    );
  }
}
