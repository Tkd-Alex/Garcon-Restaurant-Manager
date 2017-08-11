import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class Drink extends Component {

  static navigationOptions = {
    title: "Drink"
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>I'm the DRINK component</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
