import React, { Component } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity ,KeyboardAvoidingView } from 'react-native';
import { Container, Button, Text, Form, Item, Input, Label, Content } from 'native-base';

import { loginUser } from '../actions'

import LogoContainter from '../logoContainer'

export default class Login extends Component {

  static navigationOptions = {
    title: "Accesso"
  }

  state = {
    mail: "",
    password: "",
  }

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <LogoContainter/>
        <Container style={{ padding: 15 }}>
          <Content>
            <Form>
              <Item><Input onChangeText={(mail) => this.setState({mail})}
                           returnKeyType="next" keyboardType="email-address" autoCapitalize="none" autoCorrect={false} placeholder="E-Mail" /></Item>
              <Item><Input onChangeText={(password) => this.setState({password})}
                           returnKeyType="go" secureTextEntry autoCapitalize="none" autoCorrect={false} placeholder="Password" /></Item>
            </Form>
            <Button onPress={() => this.props.loginUser() }
                    style={{ marginBottom: 10 }} block danger><Text>Accedi</Text></Button>
            <Button onPress={() => this.props.navigation.navigate("Registration", {})}
                    style={{ marginBottom: 10 }} block><Text>Registrati</Text></Button>
          </Content>
        </Container>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center'
  },
});
