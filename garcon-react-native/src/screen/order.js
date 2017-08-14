import Expo from 'expo';
import React, { Component } from 'react';
import { View, Platform, StyleSheet } from 'react-native';
import { Container, Content,  Header, Left, Body, Right, H3,
         Button, Icon, Title, List, ListItem, Text, Card, CardItem } from 'native-base';

import Colors from '../constants/Colors';

export default class Order extends Component {

  static navigationOptions = {
    title: "Order"
  };

  render() {
    return (
      <Container>
        <Header androidStatusBarColor={Colors.tintColorDark} style={{ backgroundColor: Colors.tintColor }}>
          <Body>
            <Title style={{color: "white"}}>Ordini</Title>
          </Body>
        </Header>
        <Content>
          <Card style={{flex: 0}}>
            <CardItem>
              <Left>
                  <H3>
                    Nome pizza evviva
                  </H3>
              </Left>
            </CardItem>
            <CardItem>
              <Body>
                <Text>
                  Ingredienti fantastici al mondo che arrivano da ovunque
                </Text>
              </Body>
            </CardItem>
            <CardItem>
              <Left>
                <Icon name="logo-euro" />
                <Text>20.30</Text>
              </Left>
              <Left>
                <Icon android="md-cube" ios="ios-cube"/>
                <Text>3</Text>
              </Left>
              <Right>
                <View style={styles.buttonContainer}>
                <Button style={styles.smallestButton} small success><Icon ios='ios-add' android='md-add' /></Button>
                <Button style={styles.smallestButton} small danger><Icon ios='ios-remove' android='md-remove' /></Button>
                <Button style={styles.smallestButton} small warning><Icon ios='ios-restaurant' android='md-restaurant' /></Button>
                </View>
              </Right>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}


const styles = StyleSheet.create({
  smallestButton: {
    paddingLeft: 5,
    paddingRight: 5,
    marginLeft: 5
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  }
});
