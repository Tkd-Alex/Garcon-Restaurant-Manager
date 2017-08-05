import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, KeyboardAvoidingView } from 'react-native';
import { Container } from 'native-base';
import RegistrationForm from './RegistrationForm'
import LogoContainter from '../LogoContainer'

export default class Registration extends Component {
  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <LogoContainter/>
        <Container><RegistrationForm /></Container>
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
  logoContainter:{
    alignItems: 'center',
    justifyContent: 'center'
  },
  titleStyle: {
    color: '#c0392b',
    fontSize: 20,
    paddingTop: 10,
    fontWeight: 'bold',
    textAlign: 'center',
    width: 200
  }
});
