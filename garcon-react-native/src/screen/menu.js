import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class Menu extends Component {

  static navigationOptions = {
    title: "Menu"
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>I'm the MyComponent component</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
