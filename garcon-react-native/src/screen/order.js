import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class Order extends Component {

  static navigationOptions = {
    title: "Order"
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>I'm the ORDER component</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
