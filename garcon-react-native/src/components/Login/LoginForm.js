import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

export default class MyComponent extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TextInput returnKeyType="next" keyboardType="email-address" autoCapitalize="none" autoCorrect={false} placeholder="Username" style={styles.input}></TextInput>
        <TextInput returnKeyType="go" secureTextEntry autoCapitalize="none" autoCorrect={false} placeholder="Password" style={styles.input}></TextInput>
        <TouchableOpacity style={styles.buttonContainer}>
          <Text style={styles.buttonText}>LOGIN</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20
  },
  input: {
    height: 40,
    backgroundColor: '#7f8c8d',
    marginBottom: 20,
    color: '#FFFF',
    paddingHorizontal: 10
  },
  buttonContainer: {
    backgroundColor: '#c0392b',
    paddingVertical: 15
  },
  buttonText: {
    textAlign: 'center',
    color: '#FFFF',
    fontWeight: '600'
  }
});
