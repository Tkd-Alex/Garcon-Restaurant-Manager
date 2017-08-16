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
      <ListItem style={{marginLeft: 0}}>
        <View style={{width: '75%'}}>
          <Body>
            <Text>{this.props.product.name}</Text>
            <Text note style={{fontSize: 12}}>{this.props.product.ingredients.map(o => o.name).join(', ')}</Text>
          </Body>
        </View>
        <Right>
          <View style={styles.buttonContainer}>
            <Button style={styles.smallestButton} onPress={() => this.props.incrementCallback(this.props.product) } small success><Icon name='ios-add' /></Button>
            { this.props.product.category == 'Food' &&
            <Button style={styles.smallestButton} onPress={() => this.props.navigation.navigate("editProduct", {})} small warning><Icon name='ios-restaurant' /></Button>
            }
          </View>
        </Right>
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
      <ListItem style={{marginLeft: 0}}>
        <Body>
          <Text>{this.props.product.name}</Text>
          <Text note>{this.props.product.ingredients.map(o => o.name).join(', ')}</Text>
        </Body>
        <Right>
          <View style={styles.buttonContainer}>
            <Button style={styles.smallestButton} onPress={() => this.props.incrementCallback(this.props.product) } small success><Icon name='md-add'/></Button>
            { this.props.product.category == 'Food' &&
            <Button style={styles.smallestButton} onPress={() => this.props.navigation.navigate("editProduct", {})} small warning><Icon name='md-restaurant'/></Button>
            }
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
    alignItems: 'flex-end'
  }
});
