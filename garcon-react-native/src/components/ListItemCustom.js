import Expo from 'expo';
import React, { Component } from 'react';
import { View, Platform, StyleSheet } from 'react-native';
import { Container, Content, Left, Body, Right,
         Button, Icon, Title, ListItem, Text, InputGroup, Input } from 'native-base';

export default class ListItemCustom extends Component {
render() {
  if(Platform.OS === 'ios'){
    { /*
    |===================
    | Ios solution
    |===================
    */}
    return (
      <ListItem style={{marginLeft: 0}} onPress={() => {alert("TEST!")}}>
        <View style={{width: '75%'}}>
          <Body>
            <Text>{this.props.title}</Text>
            <Text note style={{fontSize: 12}}>{this.props.description}</Text>
          </Body>
        </View>
        <View>
          <Right>
            <View style={styles.buttonContainer}>
              <Button style={styles.smallestButton} small success><Icon name='ios-add' /></Button>
              <Button style={styles.smallestButton} small danger><Icon name='ios-remove' /></Button>
            </View>
          </Right>
        </View>
      </ListItem>
    )
  }
  else{
    { /*
    |===================
    | Android solution
    |===================
    */}
    return (
      <ListItem style={{marginLeft: 0}} onPress={() => {alert("TEST!")}}>
        <Body>
          <Text>{this.props.title}</Text>
          <Text note>{this.props.description}</Text>
        </Body>
        <Right>
          <View style={styles.buttonContainer}>
            <Button style={styles.smallestButton} small success><Icon name='md-add'/></Button>
            <Button style={styles.smallestButton} small danger><Icon name='md-remove'/></Button>
          </View>
        </Right>
      </ListItem>
    )
    }
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
