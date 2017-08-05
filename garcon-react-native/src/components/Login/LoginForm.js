import React, { Component } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Button, Text, Form, Item, Input, Label } from 'native-base';

export default class MyComponent extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Form>
          <Item><Input returnKeyType="next" keyboardType="email-address" autoCapitalize="none" autoCorrect={false} placeholder="Username" /></Item>
          <Item><Input returnKeyType="go" secureTextEntry autoCapitalize="none" autoCorrect={false} placeholder="Password" /></Item>
        </Form>
        <Button block danger><Text>Login</Text></Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 15
  }
});
