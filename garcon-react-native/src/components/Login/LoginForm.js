import React, { Component } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Container, Button, Text, Form, Item, Input, Label } from 'native-base';

export default class LoginForm extends Component {
  render() {
    return (
      <Container style={{ padding: 15 }}>
        <Form>
          <Item><Input returnKeyType="next" keyboardType="email-address" autoCapitalize="none" autoCorrect={false} placeholder="E-Mail" /></Item>
          <Item><Input returnKeyType="go" secureTextEntry autoCapitalize="none" autoCorrect={false} placeholder="Password" /></Item>
        </Form>
        <Button style={{ marginBottom: 10 }} block danger><Text>Login</Text></Button>
        <Button style={{ marginBottom: 10 }} block><Text>Registrati</Text></Button>
      </Container>
    );
  }
}
