import React, { Component } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity ,KeyboardAvoidingView } from 'react-native';
import { Container, Button, Text, Form, Item, Input, Label } from 'native-base';

import LogoContainter from '../LogoContainer'

export default class Login extends Component {

  static navigationOptions = {
    title: "Accesso"
  }

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <LogoContainter/>
        <Container style={{ padding: 15 }}>
          <Form>
            <Item><Input returnKeyType="next" keyboardType="email-address" autoCapitalize="none" autoCorrect={false} placeholder="E-Mail" /></Item>
            <Item><Input returnKeyType="go" secureTextEntry autoCapitalize="none" autoCorrect={false} placeholder="Password" /></Item>
          </Form>
          <Button style={{ marginBottom: 10 }} block danger><Text>Accedi</Text></Button>
          <Button onPress={() => this.props.navigation.navigate("Registration", {})} style={{ marginBottom: 10 }} block><Text>Registrati</Text></Button>
        </Container>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#bdc3c7',
  },
});
