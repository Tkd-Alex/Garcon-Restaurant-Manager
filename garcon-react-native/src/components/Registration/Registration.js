import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, KeyboardAvoidingView } from 'react-native';
import { Container, Button, Content } from 'native-base';

import RegistrationForm from './RegistrationForm'
import LogoContainter from '../LogoContainer'

export default class Registration extends Component {

  static navigationOptions = {
    title: "Registrazione"
  };

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <LogoContainter/>
        <Container>
          <Content>
            <RegistrationForm />
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
    justifyContent: 'center',
    backgroundColor: '#bdc3c7',
  },
});
